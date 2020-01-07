import React from 'react'

import { connect } from 'react-redux'

import { setPost, savingPosts } from '../../redux/actions'
// need to persists posts to state so props.savingPosts(input)
// add an onclick function and then console.log userPosts to make sure its saved
// we will add that to th UserPosts page later maybe.


function PostResponse(props) {

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
    post: dsReducer.post, // props.post
    userPosts: dsReducer.userPosts
  }
}

export default connect(mapStateToProps, {
  setPost,
  savingPosts
})(PostResponse)