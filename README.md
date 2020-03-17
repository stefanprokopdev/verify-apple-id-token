# Verify Apple idToken

- Small utility which verifies the Apple idToken
- You can use it on the backend side
- Token verification is part of [Apple sign-in](https://developer.apple.com/documentation/signinwithapplerestapi) process
- The flow is
    - Client app (iOS or Android) will redirect user to the OAuth2 login screen
    - User will login
    - App will receive the tokens
    - App should send the `idToken` to the backend which will verify it

## Installation
```bash
npm install verify-apple-id-token
```

## Usage
```typescript
import verifyAppleToken from 'verify-apple-id-token';

// Apple clientId is optional
const jwtClaims = await verifyAppleToken('yourIdToken', 'yourAppleClientId');
```
