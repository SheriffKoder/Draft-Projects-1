import {useState, useEffect} from "react";
//we do not need React as we are not using here any JSX

// API (2)
import API from "../API";

// Helpers
import { isPersistedState } from "../helpers";

//(2.1)
//to reset stuff, will need that later
//same as the movie object fetched from the API
const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0

};



//(2)
export const useHomeFetch = () => {

    //(3) and export at the end
    const [searchTerm, setSearchTerm] = useState("");

    console.log(searchTerm);

    //state that will hold all the movies (1)
    //setting three states will trigger a re-render 3 times
    //would find movies consoled three times, but react will diff these outputs
    //and only update the dom for things that have changed
    //it doesn't matter if it re-renders many times, as react is fast
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [isLoadingMore, setIsLoadingMore] = useState(false); //(4) Button

    //(2)
    //fetch from the API and await the data
    const fetchMovies = async(page, searchTerm ="" ) => {
        try {
            setError(false);    //set any pre-set errors to false again as we are trying to fetch
            setLoading(true);   //as now we are fetching, set flag to true, to keep track when we are actually fetching and show the loading spinner
            
            //reach out to the API file and use this function
            const movies = await API.fetchMovies(searchTerm, page);
            // console.log(movies);

            //return an object
            setState(prev => ({
                ...movies, 
                //want to add the movies to any previously fetched movies
                //if no previously fetched movies, just put the fetched movies
                result:
                page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));

        } catch (error) {
            //can have a state to store the error message
            setError(true);
        }

        //if we fetched all movies, want to set loading to false
        setLoading(false);

    }

    //(2)
    // //trigger this only when we mount the home component, on the initial run
    // useEffect(() => {

    //     //call the function we defined above
    //     fetchMovies(1);


    // }, []);



    //(4) initial and search
    //trigger on initial and when the search term changes
    useEffect(() => {

        //(5.1)
        //homeState is the property we will write to the session storage
        //not check if we have anything in the session storage if we are in a search
        if (!searchTerm) {
            const sessionState = isPersistedState("homeState");

            if (sessionState) {
                console.log("Grabbing from sessionStorage");
                setState(sessionState);
                //return and not do anything else/not fetch from the API
                return;
            }

        }

        console.log("Grabbing from API");

        //we also want to wipeout the old search state before making a new search
        setState(initialState);

        //call the function we defined above
        //the search term on initial render will be an empty string
        //so on the initial render will still fetch the popular movies
        fetchMovies(1, searchTerm);


    }, [searchTerm]);


    //(4) Button
    //only cause this useEffect to trigger when we are loading more
    useEffect(() => {
        //if not loading more, just return
        if (!isLoadingMore) return;

        //want to load the next page, and searchTerm if we are in a search
        fetchMovies(state.page + 1, searchTerm)
        setIsLoadingMore(false);

    },[isLoadingMore, searchTerm, state.page]);
    

    //(5.1)
    // Write to sessionStorage
    // dependency array to write when the searchTerm/state changes
    useEffect(() => {

        if(!searchTerm) {
            sessionStorage.setItem("homeState", JSON.stringify(state));
        }


    }, [searchTerm, state])


    //(2.1) //(3) //(4) pass the state down to the button
    return { state, loading, error, setSearchTerm, searchTerm , setIsLoadingMore};

}