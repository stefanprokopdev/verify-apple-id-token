[![Build Status](https://travis-ci.com/stefan-prokop-cz/verify-apple-id-token.svg?branch=master)](https://travis-ci.com/stefan-prokop-cz/verify-apple-id-token)
[![npm version](https://badge.fury.io/js/verify-apple-id-token.svg)](https://www.npmjs.com/package/verify-apple-id-token)
[![Coverage](https://img.shields.io/codeclimate/coverage/stefan-prokop-cz/verify-apple-id-token.svg?style=flat-square)](https://codeclimate.com/github/stefan-prokop-cz/verify-apple-id-token)

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
```typescript
import verifyAppleToken from 'verify-apple-id-token';

const jwtClaims = await verifyAppleToken({
    idToken: 'yourIdToken',
    clientId: 'yourAppleClientId',
    nonce: 'nonce', // optional
});
```
