//React
import React, { useEffect } from 'react'

//Components
import UserPosts from './SavedPosts/UserPosts'

//Actions
import { getAllPosts, getUserPosts } from '../redux/actions'

import { connect } from 'react-redux'; 

const SavedPosts = props => {


  useEffect(() => {
    //props.getAllPosts()
    props.getUserPosts(props.userId)
  },[])

  return (
    <>
      
    </>
  )
}
const mapStateToProps = ({ serverReducer }) => { 
  return { 
    userId: serverReducer.userId
  }
}

export default connect(mapStateToProps, 
  {getAllPosts, getUserPosts}
)(SavedPosts)   