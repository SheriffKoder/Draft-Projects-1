
//02.02
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// console.log("clientId "+process.env.GOOGLE_ID,
//     " GOOGLE_CLIENT_SECRET "+process.env.GOOGLE_CLIENT_SECRET);

//02.03
import { connectToDB } from "@utils/database";

//02.04
import User from "@models/user";



//to handle authentication
//options object, options object
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({email: session.user.email});
    
            session.user.id = sessionUser._id.toString();
    
            return session;
    
        },
        //sign in and create a user in the DB
        async signIn({ profile }) {
            try {
                //serverless function
                await connectToDB();    //02.03
    
                //check if a user already exists
                const userExists = await User.findOne({email: profile.email});
                //if not, create a new user and save it to the database  
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),   //make sure no spaces
                        image: profile.picture
                    })
                }
                //return true;
                return true;
    
    
            } catch (error) {
                console.log(error);
                return false;
            }
    }
    //get data about that user every single time to keep an existing and running session
    //know which user is currently online
    
    }
})


export {handler as GET, handler as POST};


/*





*/