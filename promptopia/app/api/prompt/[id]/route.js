
//05.07

// GET (read)

//copied from app > api > prompt > route.js
//but will add the {params} as we have [id]
//and find byId not find all
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {

    try {
        await connectToDB();

        //filter the prompts, then
        //populate the creator so we know who created it
        const prompt = await Prompt.findById(params.id).populate("creator");

        if (!prompt) return new Response ("Prompt not found", {status: 404});

        return new Response(JSON.stringify(prompt), {status: 200});

    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch the prompt"), {status: 500});

    }


}
// PATCH (update)

export const PATCH = async (request, {params}) => {
    //get the data we passed for the update
    const { prompt, tag } = await request.json();
    
    try {

        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response("Prompt not found", {status: 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200});

    } catch (error) {
        return new Response(JSON.stringify("Failed to update the prompt"), {status: 500});

    }
    
}



// DELETE (delete)
export const DELETE = async (request, {params}) => {
    
    try {

        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response(JSON.stringify("Prompt deleted successfully"), { status: 200});

    } catch (error) {
        
        return new Response(JSON.stringify("Failed to update the prompt"), {status: 500});

    }

}