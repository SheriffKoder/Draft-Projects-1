
import React from "react";
import PropTypes from "prop-types";
//Styles
import { Wrapper, Content } from "./Grid.styles";


//children, a default prop we can use in react
//when we nest things inside a component
//they will be accessible in the children prop
const Grid = ({header, children}) => (

    <Wrapper>
        <h1>{header}</h1>
        <Content>{children}</Content>
    </Wrapper>

);

Grid.propTypes = {
    header: PropTypes.string
};

export default Grid;