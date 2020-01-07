import React from 'react'; 
import users from '../library/PostHereUsers2'; 

//Components
import PostForm from './PostHere/PostForm'
import PostResponse from './PostHere/PostResponse'

const PostHere = () => { 

    return (
        <div>
            <h2>Post Here App</h2>
            <PostForm />
            <PostResponse />
        </div>
    )
}
export default PostHere; 
