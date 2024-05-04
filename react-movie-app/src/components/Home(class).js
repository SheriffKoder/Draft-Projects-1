import React, { Component } from "react";



// Config (1)
//will import some things from the config.js file
import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL} from "../config";

//Components
import HeroImage from "./HeroImage"; //(3)
import Grid from "./Grid"; //(3)
import Thumb from "./Thumb"; //(3)
import Spinner from "./Spinner"; //(3)
import SearchBar from "./SearchBar"; //(3)
import Button from "./Button"; //(4)


//Hook
// import { useHomeFetch } from "../hooks/useHomeFetch" //(2.1)

// API (2)
import API from "../API";

//Image (1)
//can name the image any name
import NoImage from "../images/no_image.jpg";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0

};



// const Home = () => {
class Home extends Component {

    state = {
        //holds all the movies
        movies: initialState,
        searchTerm: "",
        isLoadingMore: false,
        loading: false,
        error: false,

    }

    fetchMovies = async(page, searchTerm ="" ) => {
        try {
            // setError(false);    //set any pre-set errors to false again as we are trying to fetch
            // setLoading(true);   //as now we are fetching, set flag to true, to keep track when we are actually fetching and show the loading spinner
            
            //changing the error and loading, other states will stay the same
            this.setState({error: false, loading: true});

            //reach out to the API file and use this function
            const movies = await API.fetchMovies(searchTerm, page);
            // console.log(movies);

            //return an object
            this.setState(prev => ({
                ...prev, 
                movies: {
                    ...movies, 
                    //want to add the movies to any previously fetched movies
                    //if no previously fetched movies, just put the fetched movies
                    result:
                    page > 1 ? [...prev.movies.results, ...movies.results] : [...movies.results]    
                },
                loading: false,
            }));

        } catch (error) {
            //can have a state to store the error message
            // setError(true);
            this.setState({error: true, loading: false})
        }

        //if we fetched all movies, want to set loading to false
        // setLoading(false);

    }

    //(6)
    handleSearch = searchTerm => {
        //reset movies and give the searchTerm: searchTerm
        this.setState({movies: initialState, searchTerm}, () => 
            this.fetchMovies(1, this.state.searchTerm)
        );
    }

    //(6)
    handleLoadMore = () => 
        this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);


    //(6)
    componentDidMount() {
        this.fetchMovies(1);
    }



    render () {

        //(6)
        //destructure from the state, 
        const { searchTerm, movies, loading, error} = this.state;

        if (error) return <div>Something went wrong ...</div>

        return ( 
            <>
                {/* {state.results[0] &&
                    <HeroImage />
                } */}
    
                {/* {state.results[0] ? ( */}
                {/* //(4) */}
                {!searchTerm && movies.results[0] ? (
                    <HeroImage 
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`} 
                        title={movies.results[0].original_title}
                        text={movies.results[0].overview}    
                    /> )
                    : null
                }
    
                {/* <SearchBar setSearchTerm={setSearchTerm}/> */}
                {/* //(6) */}
                <SearchBar setSearchTerm={this.handleSearch}/>

                {/* <Grid header="Popular Movies"> */}
                {/* //(4) */}
                <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
                    {movies.results.map(movie => (
                        // <div key={movie.id}>{movie.title}</div>
                        <Thumb 
                            key={movie.id} 
                            clickable={true}
                            image = { movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage }
                            movieId={movie.id}
                        />
                    ))}
                </Grid>
                {/* <Spinner /> */}
                {/* //(4) */}
                {loading && <Spinner />}
    
                {/* (4) we do not want to show the button if we reach the last page of movies 
                and not loading (spinner instead, short circuit */}
                {movies.page < movies.total_pages && !loading && (
                    // <Button text="Load More" callback={() => setIsLoadingMore(true)}/>
                    //(6)
                    <Button text="Load More" callback={this.handleLoadMore}/>

                )};
    
            </>
        );
    
    }

    //want to do something when this state is updated


    //(2.1) destruct our custom hook
    // const {state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore} = useHomeFetch();


    //(2)
    // console.log(state);

    //if we got an error (state) will display this instead of the below return
    // if (error) return <div>Something went wrong ...</div>

    //(3)
    //fragments, <>, sometimes we do not want to create a div
    //grab the first movie in the movie results array
    //&& short circuit
    //means, if state.results is true, will use HeroImage, if not, will fallback
    //however will will use ternary
    //construct the image path as provided from the API with the provided backdrop sizes select 
    // return ( 
    //     <>
    //         {/* {state.results[0] &&
    //             <HeroImage />
    //         } */}

    //         {/* {state.results[0] ? ( */}
    //         {/* //(4) */}
    //         {!searchTerm && state.results[0] ? (
    //             <HeroImage 
    //                 image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`} 
    //                 title={state.results[0].original_title}
    //                 text={state.results[0].overview}    
    //             /> )
    //             : null
    //         }

    //         <SearchBar setSearchTerm={setSearchTerm}/>

    //         {/* <Grid header="Popular Movies"> */}
    //         {/* //(4) */}
    //         <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
    //             {state.results.map(movie => (
    //                 // <div key={movie.id}>{movie.title}</div>
    //                 <Thumb 
    //                     key={movie.id} 
    //                     clickable={true}
    //                     image = { movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage }
    //                     movieId={movie.id}
    //                 />
    //             ))}
    //         </Grid>
    //         {/* <Spinner /> */}
    //         {/* //(4) */}
    //         {loading && <Spinner />}

    //         {/* (4) we do not want to show the button if we reach the last page of movies 
    //         and not loading (spinner instead, short circuit */}
    //         {state.page < state.total_pages && !loading && (
    //             <Button text="Load More" callback={() => setIsLoadingMore(true)}/>
    //         )};

    //     </>
    // );
    //return <div>Home Page</div> //(1)

};

export default Home;