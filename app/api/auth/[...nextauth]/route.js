// API to enable Google authentication using NextAuth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

// Allows both GET and POST requests to be handled by NextAuth
// "/api/auth" becomes an authentication route for login, logout, etc
export { handler as GET, handler as POST };
