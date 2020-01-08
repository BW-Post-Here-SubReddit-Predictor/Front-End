import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import PostCard from './PostCard';
import { setPost, savingPosts } from '../../redux/actions'
import Styled from 'styled-components';

// need to persists posts to state so props.savingPosts(input)
// add an onclick function and then console.log userPosts to make sure its saved
// we will add that to th UserPosts page later maybe.

const PostResponseContainer = Styled.div`
  background-color: lightgray;
`;

function PostResponse(props) {
  const [renderedPosts, setRenderedPosts] = useState([])

  useEffect(() => {

    const newPost = {
      title: props.post.title,
      post: props.post.post_body,
      subreddits: props.response,
      user_id: localStorage.getItem('userId')

    }
    
    setRenderedPosts([...renderedPosts, newPost]);
  }, [props.post]); // BUG: There is an initial addition of an empty post

  return (
    <PostResponseContainer>
      {
        renderedPosts.map((postInfo, index) => {
          return postInfo.title ? <PostCard key={index} item={postInfo} /> : null // BUGFIX

      }
    )}
    </PostResponseContainer>
  );
}

const mapStateToProps = ({ dsReducer }) => {
  return {
    response: dsReducer.subreddit, // props.response
    post: dsReducer.post, // props.post
    userPosts: dsReducer.userPosts

  }
}

export default connect(mapStateToProps, {
  setPost,
  savingPosts
})(PostResponse)