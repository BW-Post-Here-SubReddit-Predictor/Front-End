import React from 'react'

import { connect } from 'react-redux'

import { setPost } from '../../redux/actions'

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
    response: dsReducer.subreddit,
    post: dsReducer.post
  }
}

export default connect(mapStateToProps, {
  setPost
})(PostResponse)