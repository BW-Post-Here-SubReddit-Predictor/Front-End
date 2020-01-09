//React
import React, { useEffect, useState } from 'react'
import Styled from 'styled-components';
//Components
import PostCard from './PostHere/PostCard'
//Actions
import { getAllPosts, getUserPosts } from '../redux/actions'
import { connect } from 'react-redux'; 

const SavedPostsContainer = Styled.div`
    margin: 0 auto;
`;

const SavedPosts = props => {
  // get req to server to retrieve SAVED posts (with id)

  useEffect(() => {
    props.getUserPosts(localStorage.getItem('userId'))
  },[])

  return (
    <SavedPostsContainer>
      {props.userPosts.map((item, index) => (
        <PostCard key={index} item={item} />
      ))}
    </SavedPostsContainer>
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
