import type { JwtPayload } from "jsonwebtoken";

export interface VerifyAppleIdTokenParams {
  idToken: string;
  clientId: string | string[];
  nonce?: string;
}

/**
 * The identity token is a JSON Web Token (JWT) and contains the following claims:
 * {@link https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple#3383773}
 */
export interface VerifyAppleIdTokenResponse extends JwtPayload {
  /**
   * The issuer registered claim identifies the principal that issues the identity token. Because Apple generates the token, the value is `https://appleid.apple.com`.
   */
  iss: string;

  /**
   * The subject registered claim identifies the principal that’s the subject of the identity token. Because this token is for your app, the value is the unique identifier for the user.
   * @example 000544.5e201aec537347aeb79d23cbc345170a.1321
   */
  sub: string;

  /**
   * The audience registered claim identifies the recipient of the identity token. Because the token is for your app, the value is the `client_id` from your developer account.
   * @example com.mytest.app
   */
  aud: string;

  /**
   * The issued at registered claim indicates the time that Apple issues the identity token, in the number of seconds since the Unix epoch in UTC.
   */
  iat: number;

  /**
   *  The expiration time registered claim identifies the time that the identity token expires, in the number of seconds since the Unix epoch in UTC. The value must be greater than the current date and time when verifying the token.
   */
  exp: number;

  /**
   * A String value used to associate a client session and the identity token. This value mitigates replay attacks and is present only if passed during the authorization request.
   */
  nonce?: string;

  /**
   * A Boolean value that indicates whether the transaction is on a nonce-supported platform. If you sent a nonce in the authorization request but don’t see the nonce claim in the identity token, check this claim to determine how to proceed. If this claim returns true, you should treat nonce as mandatory and fail the transaction; otherwise, you can proceed treating the nonce as options.
   */
  nonce_supported: boolean;

  /**
   * A String value representing the user’s email address. The email address is either the user’s real email address or the proxy address, depending on their status private email relay service.
   */
  email: string;

  /**
   * A Boolean value that indicates whether the service has verified the email. The value of this claim is always true, because the servers only return verified email addresses.
   */
  email_verified: boolean;

  /**
   * A Boolean value that indicates whether the email shared by the user is the proxy address.
   */
  is_private_email?: boolean;

  /**
   * An Integer value that indicates whether the user appears to be a real person.
   * Use the value of this claim to mitigate fraud.
   *
   * The possible values are: `0` (or Unsupported), `1` (or Unknown), `2` (or LikelyReal).
   */
  real_user_status?: number;

  /**
   * A String value representing the transfer identifier used to migrate users to your team. This claim is present only during the 60-day transfer period after you transfer an app.
   */
  transfer_sub?: string;

  /**
   * Code hash value
   */
  c_hash: string;
}
