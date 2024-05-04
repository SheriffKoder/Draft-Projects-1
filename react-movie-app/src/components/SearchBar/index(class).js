// import React, { useState, useEffect, useRef } from 'react';

//(6)
import React, { Component } from 'react';


import PropTypes from "prop-types";

//useState for a control component
    //input field that is going to be controller by react
    //the input field will be based on the value of the state

//useEffect to trigger when this local state changes


// Image
import searchIcon from "../../images/search-icon.svg";

//Styles
import { Wrapper, Content} from "./SearchBar.styles";




//(6)
class SearchBar extends Component {
// const SearchBar = ({ setSearchTerm}) => {

    // const [state, setState] = useState("");
    // const initial = useRef(true);

    //the text the user types in the input field
    state = {value: ""};
    timeout = null;
    
    //prevProps marked with _ to tell that we wont use it
    //will trigger on each update of the component
    componentDidUpdate(_prevProps, prevState) {
        if (this.state.value !== prevState.value) {
            const { setSearchTerm } = this.props;
        

            clearTimeout(this.timeout);

            //the timeout defined before as null
            this.timeout = setTimeout(() => {
                const { value } = this.state;
                setSearchTerm(value);
            }, 500);

            //so every time the user searches, it will update the component
            //we get into componentDidUpdate and clear the timeout and set a new one
            //that will trigger the setSearchTerm function
        }
    }


    render() {

        //destructure out
        const {value} = this.state;

        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search Movie"
                        onChange={event => this.setState({value: event.currentTarget.value})}
                        // value={this.state.value}
                        value={value}
                    />
                </Content>
            </Wrapper>
        );    
    }

    // useEffect(() => {
    //     if (initial.current) {
    //         initial.current = false;
    //         return;
    //     }
    //     const timer = setTimeout(() => {
    //         setSearchTerm(state);
    //     }, 500);

    //     //clear the timer on each render
    //     //every time before a new render will trigger this function
    //     return () =>  clearTimeout(timer);

    // }, [setSearchTerm, state]);


    // return (
    //     <Wrapper>
    //         <Content>
    //             <img src={searchIcon} alt="search-icon" />
    //             <input 
    //                 type="text" 
    //                 placeholder="Search Movie"
    //                 onChange={event => setState(event.currentTarget.value)}
    //                 value={state}
    //             />
    //         </Content>
    //     </Wrapper>
    // );

};

SearchBar.propTypes = {
    callBack: PropTypes.func,
}


export default SearchBar;