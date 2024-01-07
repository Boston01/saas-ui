import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
 import { getIdToken } from "@/utils/SessionTokenAccessor";

 export async function GET() {
    const session = await getServerSession(authOptions);

    if (session) {
        const idToken = await getIdToken();

        // This will log out the user on Keycloak side
        var url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}`;

        try {
            const resp = await fetch(url, {method: "GET"});
        } catch(err) {
            console.log(err);
            return new Response({status: 500})
        }
    }
    return new Response({status: 200})
 }