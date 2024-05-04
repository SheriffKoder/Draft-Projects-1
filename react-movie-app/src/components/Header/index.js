
import React, { useContext } from "react";
import { Link } from "react-router-dom"; //(4)


import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";


import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

// Context (7)
import { Context } from "../../context";


//implicit return (), explicit return {}
//Link wrapper was added in (4)
const Header = () => {

    //grab the user from the context (7)
    const [user] = useContext(Context);
    console.log(user);


    return (
        <Wrapper>
            <Content>
                <Link to="/">
                <LogoImg src={RMDBLogo} alt="rmdb-logo" />
                </Link>

                {/* //7 */}
                {user ? (
                    <span>
                        Logged in as: {user.username}
                    </span>
                ) : ( 
                    // react router link
                    <Link to="/login">
                        <span>Log in</span>
                    </Link>
                )
            }



                <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
            </Content>
        </Wrapper>
    );
};

export default Header;