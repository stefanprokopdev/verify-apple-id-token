import mockJwks, { JWKSMock } from "mock-jwks";
import { APPLE_BASE_URL, JWKS_APPLE_URI } from "../../lib/verifyAppleIdToken";

export const EXPIRY_DATE = "2021-01-01";

interface TokenParams {
  iss: string;
  aud: string;
  iat?: Date;
  exp?: Date;
  sub: string;
  cHash?: string;
  email: string;
  authTime?: Date;
  nonce?: string;
}

export const getJwksMock = (iss: string, path?: string) => mockJwks(iss, path);

export const getToken = (params: TokenParams, jwksMock?: JWKSMock) => {
  if (!jwksMock) {
    // eslint-disable-next-line no-param-reassign
    jwksMock = getJwksMock(APPLE_BASE_URL, JWKS_APPLE_URI);
  }
  return jwksMock.token({
    iss: params.iss,
    aud: params.aud,
    iat: (params.iat ?? new Date("2020-11-07")).getTime() / 1000,
    exp: (params.exp ?? new Date(`${EXPIRY_DATE}T23:59:59Z`)).getTime() / 1000,
    sub: params.sub,
    c_hash: params.cHash ?? "hash",
    email: params.email,
    email_verified: true,
    is_private_email: true,
    auth_time: (params.authTime ?? new Date("2020-11-06")).getTime() / 1000,
    nonce_supported: true,
    nonce: params.nonce,
  });
};
