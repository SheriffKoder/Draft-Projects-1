import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import API from "../API";

// Components
import Button from "./Button";

//Styles
import { Wrapper } from "./Login.styles";

// Context
import { Context } from "../context";



const Login = () => {

    //Add States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    // grab the context
    const [_user, setUser] = useContext(Context);
    //a hook that is imported from our navigation
    //will allow us to use the navigate const to navigate programmatically in our application
    const navigate = useNavigate();


    const handleSubmit = async () => {

        setError(false);
        try {
            const requestToken = await API.getRequestToken();
            const sessionId = await API.authenticate(
                requestToken,
                username,
                password
            );

            console.log(sessionId);
            //set in the context
            //username:username can be written as username only, ES6 syntax
            setUser({sessionId: sessionId.session_id, username});

            //navigate when successfully logged in
            navigate("/");

        } catch (error) {
            setError(true);
        }

    };

    const handleInput = e => {
        //we can also use one state in input fields, we could set the name
        //and properties in an object, and set the values in the object,
        //depending on how many inputs we add in our application
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        //check what input box we are typing in
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);


    };

    return (
        <Wrapper>
            {error && <div className="error">There was an error!</div>}
            <label>Username:</label>
            <input 
                type="text" 
                value={username}
                name="username" 
                onChange={handleInput} 
            />
            <input
                type="password"
                value={password}
                name="password"
                onChange={handleInput}
            />

            {/* we can wrap the text in the component then grab the text with a children prop */}
            <Button text="Login" callback={handleSubmit} />

        </Wrapper>
    );

    
};

export default Login