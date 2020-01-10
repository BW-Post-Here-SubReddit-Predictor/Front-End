import React from 'react'; 
import Styled from "styled-components";
import users from '../library/PostHereUsers2'; 

//Components
import PostForm from './PostHere/PostForm'
import PostResponse from './PostHere/PostResponse'

const PostHereContainer = Styled.div`
    margin: 0 auto;
    display: flex;
    align-items: top;
`;

const PostHere = () => { 
    return (
        <PostHereContainer>
            <div>
                <h2 style={{ textAlign: "center" }}>Create your post and the SubReddit Predictor make suggestions</h2>
                <PostForm />
                <PostResponse />
            </div>
        </PostHereContainer>
    )
}
export default PostHere; 
