//02.04
import { Schema, model, models } from "mongoose";

//the "models", provided by mongoose library and stores all the previously registered models.
//if a model named "User already exists in the "models" object, it assigns
//that existing model to the "User" variable.
//this prevents redefining the model and ensures that the existing model is reused


const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"], //message if it fails (not true)
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]

    },
    image: {
        type: String,

    }
});


//with a regular express, always running backend server we would
// const User = model("User", UserSchema);
// export default User;

//but in next js the route will run when it is called, and run from scratch (thus will try to create the schema again)
//check if a User model exists in the "models" and only if it is there create a new one
const User = models.User || model("User", UserSchema);
export default User;


