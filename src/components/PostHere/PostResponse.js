import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import PostCard from './PostCard';
import { setPost, savingPosts } from '../../redux/actions'
// need to persists posts to state so props.savingPosts(input)
// add an onclick function and then console.log userPosts to make sure its saved
// we will add that to th UserPosts page later maybe.



function PostResponse(props) {

  const [renderedPosts, setRenderedPosts] = useState([])
  // an array of currently rendering posts
  // ie userPosts[2].subreddits.map => generate a list of subreddits for a given post at index 2
  useEffect(() => {

    const newPost = {
      title: props.post.title,
      post: props.post.post_body,
      subreddits: props.response,
      user_id: localStorage.getItem('userId'), 
      
    }
    setRenderedPosts([
      ...renderedPosts,
      newPost
    ])
  }, [props.post])

  return (
    <div>
      {renderedPosts.map((item, index) => {
      
        return (
          <PostCard key={index} item={item} />
        )
      }
    )}
    </div>
  )
}

const mapStateToProps = ({ dsReducer }) => {

  return {
    response: dsReducer.subreddit, // props.response
    post: dsReducer.post, // props.post
    userPosts: dsReducer.userPosts

  }
}

export default connect(mapStateToProps, {
  setPost,
  savingPosts
})(PostResponse)