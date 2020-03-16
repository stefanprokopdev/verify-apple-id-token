import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

const APPLE_BASE_URL = 'https://appleid.apple.com';

export interface AppleVerificationParams {
    idToken: string;
    clientId?: string;
}

export const getApplePublicKey = async (kid) => {
    const client = jwksClient({
        cache: true,
        jwksUri: `${APPLE_BASE_URL}/auth/keys`,
    });
    const key: any = await new Promise((resolve, reject) => {
        client.getSigningKey(kid, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
    return key.publicKey as jwksClient.CertSigningKey || key.rsaPublicKey as jwksClient.RsaSigningKey;
};

export default async (params: AppleVerificationParams) => {
    const decoded = jwt.decode(params.idToken, { complete: true });
    const { kid, alg } = decoded.header;
    const applePublicKey = await getApplePublicKey(kid);
    const jwtClaims = jwt.verify(params.idToken, applePublicKey, { algorithms: [alg] });
    if (params.clientId && jwtClaims.aud !== params.clientId) {
        throw new Error(`The aud parameter does not include this client - is: ${jwtClaims.aud} | expected: ${params.clientId}`);
    }
    return jwtClaims;
};
