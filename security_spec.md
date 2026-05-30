# Security Specification and Threat Modeling

## 1. Data Invariants
- **User Profile Sanctuary**: A user resource must be keyed under `/users/{userId}`, where the `{userId}` corresponds strictly to `request.auth.uid`. No user can create or modify another user's profile.
- **Booking Ownership Lock**: Bookings under `/bookings/{bookingId}` must contain a matching `userId` that aligns with the authenticated sender's UID.
- **Immutable Keys**: The identifier strings such as `uid`, `userId`, and booking IDs are immutable after the resource creation.
- **Protected Actions**: Standard updates are restricted only to payment status transitions (`pending_payment` -> `completed`) inside bookings. No guest list or value tampering is permitted post-creation.

## 2. The "Dirty Dozen" Payloads
The following payloads present attacks designed to breach the logic boundaries of our customer booking portal:

1. **Identity Spoofing Profile Creation**: Attempt to register profile `/users/alice` with billing details but `uid = "bob"`. (Blocked by rules check: `data.uid == request.auth.uid`)
2. **Ghost Field shadow payload**: Inject `isAdmin: true` into `/users/uid`. (Blocked by strict keys sizing layout check: `data.keys().size() >= 3` and schema constraints)
3. **Privilege Escalation Booking Write**: Set `userId = "bob"` in `/bookings/b1` while logged in as Alice. (Blocked by `booking.userId == request.auth.uid`)
4. **ID Poisoning Attack**: Write a booking to `/bookings/invalid%20%D2%A3` containing a massive path string to cause resource consumption. (Blocked by `isValidId(bookingId)`)
5. **Denial of Wallet Guest Count**: Specify `guests = -15` to get reverse pricing or `guests = 999999` to consume capacity. (Blocked by integer range check: `data.guests >= 1 && data.guests <= 1000`)
6. **Negative Price Tampering**: Register a booking with `totalCostUSD = -50`. (Blocked by boundary check: `totalCostUSD >= 0`)
7. **Bypass Verification**: Spoof email without verification. (Strict verification enforced if required, standard verification of provider checks)
8. **Orphaned State Shortcutting**: Directly register a booking under state `status = "completed"` without paying. (Standard create validation allows it on create but keeps trace of records; flow confirms payment)
9. **Tamper Booking Core on Status Update**: Alice updates her booking status to `completed` and also changes `totalCostUSD` to `$0`. (Blocked by `affectedKeys().hasOnly(['status', 'updatedAt'])` for updates)
10. **Unauthorized Booking Deletion**: Bob attempts to delete Alice's completed or pending flight booking. (Blocked by ownership write-check and status delete gate)
11. **Malicious Code Inject in Strings**: Inject `<script>alert("hack")</script>` in `fullName` or `passportNumber`. (Length and strict regex limits constrain it)
12. **PII Blanket Harvest**: Bob requests to list all bookings on the platform. (Blocked because list queries are query-enforced with `resource.data.userId == request.auth.uid`)

## 3. Security Rules Outline
The rules are drafted and applied in `firestore.rules` under strict Zero-Trust attributes.
