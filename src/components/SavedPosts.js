//React
import React, { useEffect } from 'react'

//Components
import UserPosts from './SavedPosts/UserPosts'

//Actions
import { getAllPosts, getUserPosts } from '../redux/actions'

import { connect } from 'react-redux'; 

const SavedPosts = props => {

  console.log(props, 'props')
  useEffect(() => {
    //props.getAllPosts()
    props.getUserPosts(localStorage.getItem('userId'))
    // it's not working yet because we need a link to not have to refresh page
  },[])

  return (
    <div>
      {props.userPosts.map((input, index) => (
        <div key={index}>
          <div>{input.message}</div>
        </div>
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