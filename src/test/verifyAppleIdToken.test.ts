import mockDate from "mockdate";
import verifyAppleIdToken from "../index";
import { APPLE_BASE_URL, JWKS_APPLE_URI } from "../lib/verifyAppleIdToken";
import { EXPIRY_DATE, getJwksMock, getToken } from "./utils/jwksMock";

describe("Verify Apple idToken", () => {
  const clientId = "test.app";
  const secondClientId = "test2.app";
  const email = "test@app.com";
  const jwksMock = getJwksMock(APPLE_BASE_URL, JWKS_APPLE_URI);
  beforeAll(() => {
    mockDate.set(EXPIRY_DATE);
    jwksMock.start();
  });
  afterAll(() => jwksMock.stop());
  it("Token is valid", async () => {
    const token = getToken(
      {
        email,
        iss: APPLE_BASE_URL,
        aud: clientId,
        sub: email,
      },
      jwksMock
    );
    const claims = await verifyAppleIdToken({ clientId, idToken: token });
    expect(claims.email).toEqual(email);
    expect(claims.aud).toEqual(clientId);
    expect(claims).toMatchSnapshot();
  });
  it("Token is valid with multiple client ids", async () => {
    const token = getToken(
      {
        email,
        iss: APPLE_BASE_URL,
        aud: secondClientId,
        sub: email,
      },
      jwksMock
    );
    const claims = await verifyAppleIdToken({
      clientId: [clientId, secondClientId],
      idToken: token,
    });
    expect(claims.email).toEqual(email);
    expect(claims.aud).toEqual(secondClientId);
    expect(claims).toMatchSnapshot();
  });
  it("ISS field is not valid", async () => {
    try {
      const idToken = getToken(
        {
          email,
          sub: "sub",
          aud: clientId,
          iss: "test.iss",
        },
        jwksMock
      );
      await verifyAppleIdToken({ clientId, idToken });
    } catch (error) {
      return expect(error.message).toMatch(
        /The iss does not match the Apple URL/
      );
    }
    throw new Error("Expected to throw");
  });
  it("The aud field is not valid", async () => {
    try {
      const idToken = getToken(
        {
          email,
          iss: APPLE_BASE_URL,
          aud: clientId,
          sub: "sub",
        },
        jwksMock
      );
      await verifyAppleIdToken({ idToken, clientId: "test" });
    } catch (error) {
      return expect(error.message).toMatch(
        /The aud parameter does not include this client/
      );
    }
    throw new Error("Expected to throw");
  });
  it("Token is expired", async () => {
    try {
      const idToken = getToken(
        {
          email,
          sub: "sub",
          aud: clientId,
          iss: APPLE_BASE_URL,
          exp: new Date("2019-01-01"),
        },
        jwksMock
      );
      await verifyAppleIdToken({ idToken, clientId });
    } catch (error) {
      return expect(error.message).toMatch(/"exp" claim timestamp check failed/);
    }
    throw new Error("Expected to throw");
  });
  it("Nonce is not valid", async () => {
    try {
      const idToken = getToken(
        {
          email,
          sub: "sub",
          aud: clientId,
          iss: APPLE_BASE_URL,
          nonce: "abc",
        },
        jwksMock
      );
      await verifyAppleIdToken({ idToken, clientId, nonce: "def" });
    } catch (error) {
      return expect(error.message).toMatch(/The nonce parameter does not match/);
    }
    throw new Error("Expected to throw");
  });
});
