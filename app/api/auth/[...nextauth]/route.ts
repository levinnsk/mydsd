import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const {  GET, POST } = handlers
/*import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";


const handler = NextAuth(authConfig)
export { handler as GET, handler as POST}*/