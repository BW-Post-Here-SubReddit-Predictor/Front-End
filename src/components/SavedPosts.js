//React
import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'
//Components
import PostCard from './PostHere/PostCard'
import LoginSpinner from './Home/LoginSpinner'
//Actions
import { getAllPosts, getUserPosts } from '../redux/actions'
import { connect } from 'react-redux' 

const SavedPostsContainer = Styled.div`
    margin: 0 auto;
`;

const SavedPosts = props => {
  // get req to server to retrieve SAVED posts (with id)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    props.getUserPosts(localStorage.getItem('userId'))
  },[])

  const handleChange = event => {
    setSearchTerm(event.target.value);
    console.log(setSearchTerm);
  };

  return (
    <SavedPostsContainer>
      <form>
        <input 
          type="text" 
          name="search" 
          onChange={handleChange}
          value={searchTerm} 
        />
      </form>
      {props.userPosts.length !== 0 ? props.userPosts.filter(post =>
        searchTerm !== '' ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) : true).map((item, index) =>
      <PostCard key={index} item={item} />) : searchTerm && <LoginSpinner /> }
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
