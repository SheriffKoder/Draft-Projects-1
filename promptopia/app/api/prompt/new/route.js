

//03.03
//we need to connect to the DB
import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt"; //03.04

//03.03
export const POST = async (req, res) => {

    //[grab] the things that we have passed through the post request
    const { userId, prompt, tag } = await req.json();

    try {
        //[connect] to the db, every time because this is a lambda function
        //i.e will end once it does its job
        await connectToDB();
        //once we are connected, we want to create a new prompt

        //03.05
        //[pass] the creator and the tag
        const newPrompt = new Prompt({ 
            creator: userId,
            prompt,
            tag
        });

        //03.05 [save]
        await newPrompt.save();

        //[return a new response] where we can stringify the prompt
        //and specify the status
        return new Response(JSON.stringify(newPrompt), {status: 201});


    } catch (error) {
        return new Response("Failed to create a new prompt", {status: 500});
    }

}