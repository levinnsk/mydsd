import type { NextAuthConfig } from "next-auth";
export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // d * h * m * s
    updateAge: 1 * 60 * 60, // h * m * s
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/main");
      const emailVerified = auth?.user.emailVerified!;
      console.log('emailVerified auth.config =', (emailVerified) ? "true" : "false")
      //сессия не обновляется
      const mobilePhoneVerify = auth?.user.mobilePhoneVerify!;
      console.log('mobilePhoneVerify auth.config =', (mobilePhoneVerify) ? "true" : "false")

      // исправить //здесь проверку верификации почты и телефона!!!
      if (isOnDashboard) {
        if (isLoggedIn) return true; //Добавь проверку &&
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) { //Добавь проверку emailVerified && mobilePhoneVerify
        return Response.redirect(new URL("/main", nextUrl));
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.mobilePhoneVerify = user.mobilePhoneVerify;
        token.emailVerified = user.emailVerified;

      }
      //console.log("token= ",token); //<-- output below
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.mobilePhoneVerify = token.mobilePhoneVerify;
      session.user.emailVerified = token.emailVerified;

      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;



/*

if (isOnDashboard) {
        if (isLoggedIn) return true; //Добавь проверку &&
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) { //Добавь проверку emailVerified && mobilePhoneVerify
        return Response.redirect(new URL("/main", nextUrl));
      }
      return true

      */