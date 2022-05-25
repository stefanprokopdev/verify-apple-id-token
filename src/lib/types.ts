import type { JwtPayload } from 'jsonwebtoken'

export interface VerifyAppleIdTokenParams {
  idToken: string
  clientId: string | string[]
  nonce?: string
}

export type PJwtPayload = Pick<
  JwtPayload,
  'iss' | 'iat' | 'sub' | 'aud' | 'exp'
>

export interface VerifyAppleIdTokenPayload {
  /**
   * A String value used to associate a client session and the identity token. This value mitigates replay attacks and is present only if passed during the authorization request.
   */
  nonce: string

  /**
   * A Boolean value that indicates whether the transaction is on a nonce-supported platform. If you sent a nonce in the authorization request but don’t see the nonce claim in the identity token, check this claim to determine how to proceed. If this claim returns true, you should treat nonce as mandatory and fail the transaction; otherwise, you can proceed treating the nonce as options.
   */
  nonce_supported: boolean

  /**
   * A String value representing the user’s email address. The email address is either the user’s real email address or the proxy address, depending on their status private email relay service.
   */
  email: string

  /**
   * A String or Boolean value that indicates whether the service has verified the email. The value of this claim is always true, because the servers only return verified email addresses. The value can either be a String (”true”) or a Boolean (true).
   */
  email_verified: string | boolean

  /**
   * A String or Boolean value that indicates whether the email shared by the user is the proxy address. The value can either be a String (”true” or “false”) or a Boolean (true or false).
   */
  is_private_email: string | boolean

  /**
   * An Integer value that indicates whether the user appears to be a real person. Use the value of this claim to mitigate fraud. The possible values are: 0 (or Unsupported), 1 (or Unknown), 2 (or LikelyReal). For more information, see ASUserDetectionStatus. This claim is present only on iOS 14 and later, macOS 11 and later, watchOS 7 and later, tvOS 14 and later; the claim isn’t present or supported for web-based apps.
   */
  real_user_status: number

  /**
   * A String value representing the transfer identifier used to migrate users to your team. This claim is present only during the 60-day transfer period after you transfer an app. For more information, see Bringing New Apps and Users into Your Team.
   */
  transfer_sub: string
}

export type VerifyAppleIdTokenResponse = PJwtPayload & VerifyAppleIdTokenPayload
