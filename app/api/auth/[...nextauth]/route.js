import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import jwt_decode from "jwt-decode";
import { encrypt } from "@/utils/encryption";

// this will refresh an expired access token, when needed

async function refreshAccessToken(token) {
    const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
            client_id: process.env.DEMO_FRONTEND_CLIENT_ID,
            client_secret: process.env.DEMO_FRONTEND_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
        }),
        method: "POST",
    });

    const refreshToken = await resp.json();
    if (!resp.ok) throw refreshToken;

    return {
        ...token,
        access_token: refreshToken.access_token,
        decoded: jwt_decode(refreshToken.access_token),
        id_token: refreshToken.id_token,
        expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
        refresh_token: refreshToken.refresh_token,
    }
}


export const authOptions = {
    providers: [
        KeycloakProvider({
            clientId: `${process.env.DEMO_FRONTEND_CLIENT_ID}`,
            clientSecret: `${process.env.DEMO_FRONTEND_CLIENT_SECRET}`,
            issuer: `${process.env.DEMO_ISSUER}`,
          })
    ],

    callbacks: {
        async jwt({ token, account }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {
                token.decoded = jwt_decode(account.access_token);
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token
            } else if (nowTimeStamp < token.expires_at) {
                // token has not expired  yet, return it
                return token;
            } else {
                // token is expired, try to refresh it
                console.log("Token has expired. Will refresh ....")
                // TODO
                try {
                    const refreshToken = await refreshAccessToken(token);
                    console.log("Token is refreshed")
                    return refreshToken;
                } catch (error) {
                    console.log("Error refreshing access token", error);
                    return {...token, error: "RefreshAccessTokenError"}
                }
                return token;
            }
            
        },
        async session({ session, token }) {
            // Send properties to the client
            session.access_token = encrypt(token.access_token);
            session.id_token = encrypt(token.id_token);
            session.roles = token.decoded.realm_access.roles;
            session.error = token.error;
            return session;
        }
    }

}


const handler = NextAuth(authOptions);
console.log(authOptions.providers[0]);
export {handler as GET, handler as POST};