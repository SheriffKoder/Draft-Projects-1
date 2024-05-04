
//04.03

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {

    try {
        await connectToDB();

        //filter the prompts, then
        //populate the creator so we know who created it
        const prompts = await Prompt.find({}).populate("creator");

        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch all prompts"), {status: 500});

    }


}