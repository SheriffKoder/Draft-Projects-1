import React, { Component } from "react";
import { useParams } from "react-router-dom";


//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

//Components
import Grid from "./Grid";
import Spinner from "./Spinner";
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo"; //(5)
import MovieInfoBar from "./MovieInfoBar"; //(5)
import Actor from "./Actor"; //(5)

//Hook
// import { useMovieFetch } from "../hooks/useMovieFetch"; //(4)
//API
import API from "../API";



// Image
import NoImage from "../images/no_image.jpg";

// const Movie = () => <div>Movie</div>;

class Movie extends Component {

    state = {
        movie: {},
        loading: true,
        error: false
    };

    fetchMovie = async() => {

        //(6)
        const { movieId } = this.props.params;

        try {
            // setLoading(true);
            // setError(false);
            this.setState({ error: false, loading: true});

            //grab the movie data and credits
            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);

            //get directors only
            const directors = credits.crew.filter(
                member => member.job === "Director"
            );

            // setState({
            //     ...movie,
            //     actors: credits.cast,
            //     directors
            // });

            this.setState({
                movie: {
                    ...movie,
                    actors: credits.cast,
                    directors    
                },
                loading: false,
            });


            // setLoading(false);


        } catch (error) {
            // setError(true);
            this.setState({ error: true, loading: false});
        }
    }

    componentDidMount() {
        this.fetchMovie();
    }

    render() {

        const { movie, loading, error } = this.state;

        if (loading) return <Spinner />
        if (error) return <div>Something went wrong...</div>
    

        return (
            <>
                {/* <div>Movie</div> */}
                <BreadCrumb movieTitle={movie.original_title} />
                <MovieInfo movie={movie} />
                <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
                <Grid header="Actors">
                    {movie.actors.map(actor => (
                        <Actor 
                            key={actor.credit_id} 
                            name={actor.name} 
                            character={actor.character} 
                            imageUrl={ 
                                actor.profile_path 
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                : NoImage
                            }
                        />
    
                    ))}
                </Grid>
            </>
        );
    
    }

    //movieId as named in the App.js file
    // const { movieId } = useParams();

    // const {state: movie, loading, error } = useMovieFetch(movieId);

    // if (loading) return <Spinner />
    // if (error) return <div>Something went wrong...</div>

    // return (
    //     <>
    //         {/* <div>Movie</div> */}
    //         <BreadCrumb movieTitle={movie.original_title} />
    //         <MovieInfo movie={movie} />
    //         <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
    //         <Grid header="Actors">
    //             {movie.actors.map(actor => (
    //                 <Actor 
    //                     key={actor.credit_id} 
    //                     name={actor.name} 
    //                     character={actor.character} 
    //                     imageUrl={ 
    //                         actor.profile_path 
    //                         ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
    //                         : NoImage
    //                     }
    //                 />

    //             ))}
    //         </Grid>
    //     </>
    // );
};


//(6)
//spread the props that the movie component receives
//replicate the movie component and provide it with the params
const MovieWithParams = props => <Movie {...props} params={useParams()} />

export default MovieWithParams ;

