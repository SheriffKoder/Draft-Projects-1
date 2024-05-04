
//03.04
import mongoose, {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,    //a document in the database, user type
        ref: "User",     //create a reference to the user, one to many relationship, one user many prompts
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required."],
    },
    tag: {
        type: String,
        required: [true, "Tag is required."]
    }
    
});

//either get the prompt that already exists on the model object
//or if it does not exist create a new model called Prompt based on the prompt schema
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;