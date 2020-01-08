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

  const [dummyArray, setDummyArray] = useState([
    {
      title: 'fake title',
      post: 'fake news',
      subreddits: [
        {
          'name': 'fake subreddit',
          'proba': 0.1
        },
        {
          'name': 'another fake subreddit',
          'proba': 0.2
        }
      ],
      id: 222,
      userId: localStorage.getItem('userId')
    }
  ])

  // replace dummyArray with props.userPosts once backend data comes through

  return (
    <div>
      {dummyArray.map((item, index) => (
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