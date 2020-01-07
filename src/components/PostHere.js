import React from 'react'; 
import users from '../library/PostHereUsers2'; 

//Components
import PostForm from './PostHere/PostForm'
import PostList from './PostHere/PostList'

const PostHere = () => { 

    return (
        <div>
            <h2>Create your post...</h2>
            <PostForm />
            <PostList />
        </div>
    )
}
export default PostHere; 
