import React from "react";
import styled from "styled-components";

const Button = styled.button`
position: absolute;
bottom: 20px;
left: ${props => (props.position === "left" ? "20px" : "380px")};
background: white;
color: black;
border: 1px solid black;
border-radius: 10px;
width: 100px;
height: 50px;
cursor: pointer;
`;



const LightSwitch = ({ callback, position, switchOn}) =>
    <button onClick={callback} position={position}>
        {switchOn ? "On" : "Off"}
    </button>


export default LightSwitch;