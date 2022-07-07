[![Build Status](https://github.com/stefan-prokop-cz/verify-apple-id-token/workflows/Build/badge.svg)](https://github.com/stefan-prokop-cz/verify-apple-id-token/actions)
[![Publish Status](https://github.com/stefan-prokop-cz/verify-apple-id-token/workflows/Publish/badge.svg)](https://github.com/stefan-prokop-cz/verify-apple-id-token/actions)
[![npm version](https://img.shields.io/npm/v/verify-apple-id-token)](https://www.npmjs.com/package/verify-apple-id-token)
[![codecov](https://codecov.io/gh/stefan-prokop-cz/verify-apple-id-token/branch/master/graph/badge.svg?token=TD7C0Z3YA6)](https://codecov.io/gh/stefan-prokop-cz/verify-apple-id-token)

# Verify Apple idToken

- Small utility which verifies the Apple idToken
- You can use it on the backend side
- Token verification is part of [Apple sign-in](https://developer.apple.com/documentation/signinwithapplerestapi) process
- The flow is
  - Client app (iOS or Android) will redirect user to the OAuth2 login screen
  - User will login
  - App will receive the tokens
  - App should send the `idToken` to the backend which will verify it
- [Verification steps implemented](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/verifying_a_user):
  - Verify the JWS E256 signature using the server’s public key
  - Verify the nonce for the authentication
  - Verify that the iss field contains https://appleid.apple.com
  - Verify that the aud field is the developer’s client_id
  - Verify that the time is earlier than the exp value of the token

## Installation

```bash
npm install verify-apple-id-token
```

## Usage

### Typescript

```typescript
import verifyAppleToken from "verify-apple-id-token";

const jwtClaims = await verifyAppleToken({
  idToken: "yourIdToken",
  clientId: "yourAppleClientId",
  nonce: "nonce", // optional
});

jwtClaims.email; // get email of the user
```

### Javascript

```javascript
const verifyAppleToken = require("verify-apple-id-token").default;

const jwtClaims = await verifyAppleToken({
  idToken: "yourIdToken",
  clientId: "yourAppleClientId",
  nonce: "nonce", // optional
});
```

## Contribution

Thank you for your interest in contributing to `verify-apple-id-token`! Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how to do it!

## License

[MIT](./LICENSE)
