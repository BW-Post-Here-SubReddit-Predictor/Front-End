//React
import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'
//Components
import PostCard from './PostHere/PostCard'
import LoginSpinner from './Home/LoginSpinner'
import SearchSVG from './SavedPosts/SearchSVG'
//Actions
import { getAllPosts, getUserPosts } from '../redux/actions'
import { connect } from 'react-redux' 

const SavedPostsContainer = Styled.div`
    margin: 0 auto;
`;

//search styles start
const Form = Styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  /* Change width of the form depending if the bar is opened or not */
  width: ${props => (props.barOpened ? "15rem" : "1rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${props => (props.barOpened ? "auto" : "pointer")};
  padding: 1rem;
  height: 1rem;
  border-radius: 2rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;
const Input = Styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
  border: none;
  color: black;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;
const Button = Styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;
//search style end

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
