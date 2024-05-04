import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";

//useState for a control component
    //input field that is going to be controller by react
    //the input field will be based on the value of the state

//useEffect to trigger when this local state changes


// Image
import searchIcon from "../../images/search-icon.svg";

//Styles
import { Wrapper, Content} from "./SearchBar.styles";





const SearchBar = ({ setSearchTerm}) => {

    const [state, setState] = useState("");
    const initial = useRef(true);

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500);

        //clear the timer on each render
        //every time before a new render will trigger this function
        return () =>  clearTimeout(timer);

    }, [setSearchTerm, state]);


    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon" />
                <input 
                    type="text" 
                    placeholder="Search Movie"
                    onChange={event => setState(event.currentTarget.value)}
                    value={state}
                />
            </Content>
        </Wrapper>
    );

};

SearchBar.propTypes = {
    callBack: PropTypes.func,
}


export default SearchBar;