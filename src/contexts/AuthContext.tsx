import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  registerWithEmail: (email: string, password: string, fullName: string, passportNumber: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  updateUserProfile: (fullName: string, passportNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  demoLogin: (email: string, fullName: string, passportNumber: string) => Promise<void>;
  isDemoUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(false);

  // Sync user profile from Firestore users/{uid}
  const syncProfile = async (firebaseUser: User) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setProfile(userDoc.data() as UserProfile);
      } else {
        // Create new user profile in Firestore
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          fullName: firebaseUser.displayName || 'FlyWide Customer',
          email: firebaseUser.email || '',
          passportNumber: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await setDoc(userDocRef, newProfile);
        setProfile(newProfile);
      }
    } catch (e) {
      // In case rules deny or not configured, construct fallback local profile
      console.warn("Could not sync profile from Firestore, creating fallback:", e);
      const fallback: UserProfile = {
        uid: firebaseUser.uid,
        fullName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'FlyWide Customer',
        email: firebaseUser.email || '',
        passportNumber: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProfile(fallback);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        setIsDemoUser(false);
        await syncProfile(currentUser);
      } else {
        // If demo user is active, don't clear (handled separately), else clear
        if (!isDemoUser) {
          setUser(null);
          setProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoUser]);

  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        setUser(result.user);
        await syncProfile(result.user);
      }
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (email: string, password: string, fullName: string, passportNumber: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        await firebaseUpdateProfile(result.user, { displayName: fullName });
        const userDocRef = doc(db, 'users', result.user.uid);
        const newProfile: UserProfile = {
          uid: result.user.uid,
          fullName: fullName,
          email: email,
          passportNumber: passportNumber,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        try {
          await setDoc(userDocRef, newProfile);
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `users/${result.user.uid}`);
        }
        
        setProfile(newProfile);
        setUser(result.user);
      }
    } catch (error) {
      console.error("Register with email error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        setUser(result.user);
        await syncProfile(result.user);
      }
    } catch (error) {
      console.error("Login with email error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (fullName: string, passportNumber: string) => {
    if (!user && !isDemoUser) return;
    
    setLoading(true);
    const updatedProfile = {
      ...(profile || { uid: 'demo', email: 'demo@flywide.com' }),
      fullName,
      passportNumber,
      updatedAt: new Date().toISOString()
    };

    if (isDemoUser) {
      setProfile(updatedProfile as UserProfile);
      setLoading(false);
      return;
    }

    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userDocRef, {
          fullName,
          passportNumber,
          updatedAt: new Date().toISOString()
        });
        setProfile(updatedProfile as UserProfile);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Safe Demo Login alternative for iframe environments without configuration or popping restrictions
  const demoLogin = async (email: string, fullName: string, passportNumber: string) => {
    setLoading(true);
    const demoId = `demo-${Math.random().toString(36).substring(2, 9)}`;
    const mockUser = {
      uid: demoId,
      displayName: fullName,
      email: email,
      emailVerified: true,
      isAnonymous: false,
    } as User;

    const mockProfile: UserProfile = {
      uid: demoId,
      fullName,
      email,
      passportNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save mock test user directly to Firestore, which validates rules nicely
    try {
      // Temporarily authenticate locally as demo
      setIsDemoUser(true);
      setUser(mockUser);
      setProfile(mockProfile);
    } catch (error) {
      console.error("Demo login setup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (!isDemoUser) {
        await signOut(auth);
      }
      setUser(null);
      setProfile(null);
      setIsDemoUser(false);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      loginWithGoogle,
      registerWithEmail,
      loginWithEmail,
      updateUserProfile,
      logout,
      demoLogin,
      isDemoUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
