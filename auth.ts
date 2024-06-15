import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/db";
import { authConfig } from "./auth.config";
import Nodemailer from "next-auth/providers/nodemailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth",
    //signOut: '/auth/signout',
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/main/profile" // If set, new users will be directed here on first sign in // здесь можно направить сразу на заполнение страницы профиля
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      name: "email",
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true, //разрешает вход с разными провайдерами. У меня есть проверка достоверности email, т.к. при первом входе прошу подтвердить почту
      /*account(account) { // можно наполнять доп. данными, при этом нужно указать access_token, expires_at, refresh_token, id_token, token_type, scope и session_state
              return {  
                test: "test"
                
              }
              this.allowDangerousEmailAccountLinking
      }*/
    }),
  ],
});
