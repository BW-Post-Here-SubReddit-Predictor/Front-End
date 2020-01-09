//React
import React, { useEffect, useState } from 'react'
//Components
import PostCard from './PostHere/PostCard'
import SearchForm from '../components/SavedPosts/SearchForm';
//Actions
import { getAllPosts, getUserPosts } from '../redux/actions'
import { connect } from 'react-redux'; 

const SavedPosts = props => {
  // get req to server to retrieve SAVED posts (with id)

  useEffect(() => {
    props.getUserPosts(localStorage.getItem('userId'))
  },[])

  return (
    <section>
      <SearchForm />
      <div>
        {props.userPosts.map((item, index) => (
            <PostCard key={index} item={item} />
        ))}
      </div>
    </section>
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
