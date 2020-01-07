import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setPost } from '../../redux/actions'

function PostResponse(props) {

  const [renderedPosts, setRenderedPosts] = useState([])
  // an array of currently rendering posts
  // ie userPosts[2].subreddits.map => generate a list of subreddits for a given post at index 2
  useEffect(() => {

    const newPost = {
      title: props.post.title,
      post: props.post.post_body,
      subreddits: props.response
    }
    console.log('hi')
    setRenderedPosts([
      ...renderedPosts,
      newPost
    ])
  }, [props.post])

  return (
    <>
      <div>
        <h3>{props.post.title}</h3>
        <h3>Subreddit</h3>
        <h4>Additional Stats</h4>
      </div>
    </>
  )
}

const mapStateToProps = ({ dsReducer }) => {

  return {
    response: dsReducer.subreddit, // props.response
    post: dsReducer.post // props.post
  }
}

export default connect(mapStateToProps, {
  setPost
})(PostResponse)