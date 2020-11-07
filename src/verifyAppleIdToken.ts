import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

export const APPLE_BASE_URL = 'https://appleid.apple.com';
export const JWKS_URI = '/auth/keys'

export const getApplePublicKey = async (kid) => {
    const client = jwksClient({
        cache: true,
        jwksUri: `${APPLE_BASE_URL}${JWKS_URI}`,
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

export default async (idToken: string, clientId?: string) => {
    const decoded = jwt.decode(idToken, { complete: true });
    const { kid, alg } = decoded.header;
    const applePublicKey = await getApplePublicKey(kid);
    const jwtClaims = jwt.verify(idToken, applePublicKey, { algorithms: [alg] });
    if (!jwtClaims.iss || jwtClaims.iss !== APPLE_BASE_URL) {
        throw new Error(`The iss does not match the Apple URL - iss: ${jwtClaims.iss} | expected: ${APPLE_BASE_URL}`);
    }
    if (clientId && jwtClaims.aud !== clientId) {
        throw new Error(`The aud parameter does not include this client - is: ${jwtClaims.aud} | expected: ${clientId}`);
    }
    return jwtClaims;
};
