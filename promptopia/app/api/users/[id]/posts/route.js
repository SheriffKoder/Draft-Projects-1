
//so will use the {params} as this is a dynamic url route


//04.03, 05.04

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {

    try {
        await connectToDB();

        //filter the prompts, then
        //populate the creator so we know who created it
        //we need to fetch the posts only from a specific creator
        const prompts = await Prompt.find({creator: params.id}).populate("creator");

        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch all prompts"), {status: 500});

    }


}