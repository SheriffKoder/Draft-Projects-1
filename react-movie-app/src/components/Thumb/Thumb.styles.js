import styled from "styled-components";


//transition because want a nice transition on hover
//object-fit to fit nicely into the thumbnail
export const Image = styled.img`
    width: 100%;
    max-width: 720px;
    transition: all 0.3s;
    object-fit: cover;
    border-radius: 20px;
    animation: animateThumb 0.5s;

    &:hover {
        opacity: 0.8;
    }


    @keyframes animateThumb {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`;