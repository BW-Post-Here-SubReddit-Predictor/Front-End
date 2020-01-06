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
    props.getUserPosts(1)
  },[])

  return (
    <>
      
    </>
  )
}
const mapStateToProps = state => { 
  return { 

  }
}

export default connect(mapStateToProps, 
  {getAllPosts, getUserPosts}
)(SavedPosts)   