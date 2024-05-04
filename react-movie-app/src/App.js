import React from "react";
import {useState} from "react";

//another way of creating elements than JSX
/*
const Star = () => React.createElement("div", null, "This is a little star")

const App = () => {
  return Star();
}
*/




//uplifting state (Lamp switch example)
/*
import styled from "styled-components";
import Lamp from "./components-lightSwitch/Lamp";
import LightSwitch from "./components-lightSwitch/LightSwitch";

//styled "Component"
const Room = styled.div`
position: relative;
width: 500px;
height: 500px;
border: 10px solid black;
margin: 0 auto
`;

//only use the setState to change the state, in order to cause a re-render
//setters will be called with the previous state
//will use the lamp state on both the lamp and lightSwitch
function App () {
  const [isLampOneOn, setIsLampOneOn] = useState(false);
  const [isLampTwoOn, setIsLampTwoOn] = useState(true);

  const handleLightSwitchOne = () => setIsLampOneOn(prev => !prev);
  const handleLightSwitchTwo = () => setIsLampTwoOn(prev => !prev);

  return (
    <Room>
      <Lamp lampOn={isLampOneOn} position="left" />
      <Lamp lampOn={isLampTwoOn} position="right" />

      <LightSwitch
        name="one"
        callback={handleLightSwitchOne}
        switchOn={isLampOneOn}
        position="left"
      />

      <LightSwitch
        name="two"
        callback={handleLightSwitchTwo}
        switchOn={isLampTwoOn}
        position="right"
      />


    </Room>
  );


};
*/

// Routing //(4)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Components
import Header from "./components/Header"; //h2
import Home from "./components/Home";
import Movie from "./components/Movie"; //(4)
import NotFound from "./components/NotFound"; //(4)
import Login from "./components/Login"; //(7)

// Context //(7)
import UserProvider from "./context";

// Styles
import { GlobalStyle } from "./GlobalStyle";  //h2

// const App = () => (
//     <div className="App">
//       <Header />
//       <Home />
//       <GlobalStyle />
//     </div>
// );


//(4)
//Router: wrap our complete application
//Routes: wrap our routes, can have routes in different components
//Route: to create your route
  //Path, the place to show a specific component
  //now any /324234234 id will display the movie component
  //when we need a movie, we will send the movie id, params
  //will create a link in the thumbnail with an id, and grab that id in the movie component
  //*, show the component on any other route that we did not define like /id/id not /id
const App = () => (

  <Router>

    {/* //(7) */}
    <UserProvider>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/:movieId" element={<Movie />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>


      <GlobalStyle />

    </UserProvider>

  </Router>

);

export default App;
