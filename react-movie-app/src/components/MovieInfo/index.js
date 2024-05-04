import React, {useContext} from "react";
// import PropTypes from "prop-types";

// Components
import Thumb from "../Thumb";
import Rate from "../Rate"; //(7)

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

// Image
import NoImage from "../../images/no_image.jpg";

// Styles
import {Wrapper, Content, Text} from "./MovieInfo.styles";

// Context
import { Context } from "../../context"; //(7.1)
// API
import API from "../../API";


const MovieInfo = ({ movie }) => {

    const [user] = useContext(Context); //(7)

    //(7)
    const handleRating = async value => {
        const rate = await API.rateMovie(user.sessionId, movie.id, value);
        console.log(rate);
    }

    return (
        <Wrapper backdrop={movie.backdrop_path}>
            <Content>
                <Thumb 
                    image = {movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage }
                    clickable={false}
                />
                <Text>
                    <h1>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>

                    <div className="rating-directors">
                        <div>
                            <h3>RATING</h3>
                            <div className="score">
                                {movie.vote_average}
                            </div>
                        </div>

                        <div className="director">
                            <h3>DIRECTOR{movie.directors.length > 1 ? "s" : ""}</h3>
                            {movie.directors.map(director => (
                                <p key={director.credit_id}>{director.name}</p>

                            ))}
                        </div>

                    </div>

                        {/* //(7) */}
                        if we are logged in, will show the rating, otherwise will not show anything
                        {user && (
                            <div>
                                <p>Rate Movie</p>
                                <Rate callback={handleRating} />
                            </div>
                        )}
                </Text>
            </Content>
        </Wrapper>
    );
};


// MovieInfo.propTypes = {
//     movie: PropTypes.object,
// };


export default MovieInfo;