import { connectToDb } from "@/lib/db"
import User from "@/lib/models/user.model"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: 'someting',
            clientSecret: 'secret'
        })
    ],
    callbacks: {
        async  signIn({ profile } : any) {
            try {
                await connectToDb();

                const userExists = await User.findOne({ email: profile.email })
                if (!userExists) {
                    await User.create({
                        name: profile.name,
                        email: profile.email,
                    })
                }

                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }
})