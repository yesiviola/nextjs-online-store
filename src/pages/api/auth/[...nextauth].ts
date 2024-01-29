import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET || !process.env.SECRET) {
    throw new Error('The GOOGLE_ID, GOOGLE_SECRET, and SECRET environment variables are required');
}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: process.env.SECRET,
    debug: false,


});