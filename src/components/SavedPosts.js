//React
import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'
//Components
import PostCard from './PostHere/PostCard'
import LoginSpinner from './Home/LoginSpinner'
import SearchSVG from './SavedPosts/SearchSVG'
import { Form, Input, Button } from '../components/SavedPosts/SearchStyle'
//Actions
import { getAllPosts, getUserPosts } from '../redux/actions'
import { connect } from 'react-redux' 

const SavedPostsContainer = Styled.div`
    margin: 0 auto;
`;

const SavedPosts = props => {
  // get req to server to retrieve SAVED posts (with id)
  const [searchTerm, setSearchTerm] = useState('');
  //search states
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);

  const onFormSubmit = e => {
    // When form submited, clear input, close the searchbar and do something with input
    e.preventDefault();
    setInput("");
    setBarOpened(false);
    // After form submit, do what you want with the input value
    console.log(`Form was submited with input: ${input}`);
  };

  useEffect(() => {
    props.getUserPosts(localStorage.getItem('userId'))
  },[])

  const handleChange = event => {
    setSearchTerm(event.target.value);
    console.log(setSearchTerm);
  };

  return (
    <SavedPostsContainer>
      <Form
        barOpened={barOpened}
        onClick={() => {
          setBarOpened(true);
        }}
        // on focus open search bar
        onFocus={() => {
          setBarOpened(true);
        }}
        // on blur close search bar
        onBlur={() => {
          setBarOpened(false);
        }}
        // On submit, call the onFormSubmit function
        onSubmit={onFormSubmit}
      >
        <Button type="submit" barOpened={barOpened}>
          <SearchSVG />
        </Button>
        <Input 
          type="text" 
          name="search"
          onChange={handleChange}
          value={searchTerm} 
        />
      </Form>
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
