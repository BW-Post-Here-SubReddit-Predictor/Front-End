//React
import React, { useEffect, useState } from 'react'
//Components
import PostCard from './PostHere/PostCard'
//Actions
import { getAllPosts, getUserPosts } from '../redux/actions'
import { connect } from 'react-redux'; 

const SavedPosts = props => {
  // get req to server to retrieve SAVED posts (with id)

  useEffect(() => {
    props.getUserPosts(localStorage.getItem('userId'))
  // it's not working yet because we need a link to not have to refresh page
  },[])

  // replace dummyArray with props.userPosts once backend data comes through

  return (
    <div>
      {props.userPosts.map((item, index) => (
        <PostCard key={index} item={item} />
      ))}
    </div>
  )
}

const mapStateToProps = ({ serverReducer }) => { 
  return { 
    userId: serverReducer.userId,
    userPosts: serverReducer.userPosts
  }
}

export default connect(mapStateToProps, 
  {getAllPosts, getUserPosts}
)(SavedPosts)