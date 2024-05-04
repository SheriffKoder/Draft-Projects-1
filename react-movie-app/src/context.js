import React, {useState, createContext} from "react";

//possible to provide something in the application
//that we want to use down in the component tree
//here will be a state value and a setter

export const Context = createContext();

//provider will wrap this application and make sure
//we provide this value to our application
//will wrap it in the App component so all components have access this value

//will use children because will use this component to wrap our application
//children will be App in this case
const UserProvider = ({ children }) => {
    const [state, setState] = useState(undefined);

    //provide to the application
    //the value we want our application to have access to
    //in an array, same structure as above
    //children, to make sure this provider will wrap any component in the application

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    );
}


export default UserProvider;
