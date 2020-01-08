import React, { useState } from 'react'
import axios from 'axios';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginSpinner from '../Home/LoginSpinner';
import { getUserPosts, savingPosts, saveDSResponse, setPost } from '../../redux/actions';

function PostForm(props) {
  const [input, setInput] = useState({
    submission_text:'',
    title:'',
    return_count: 3
  });
  const [spinner, setSpinner] = useState(false);
  const history = useHistory();

  const changeHandler = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const submitPost = e => {
    e.preventDefault();
    setSpinner(true)
    axios
      .post('https://btr-test.herokuapp.com/', input) //
      .then(res => {
        setSpinner(false)
        props.saveDSResponse(res.data.predictions)
        props.setPost(input)
        

      })
      .catch(err => {
        console.log(err)
        history.push('/Error')
      })
  }
  return (
    <>
      <form onSubmit={ submitPost }>
        <div>
          <textarea
            type='text'
            placeholder='title'
            name='title'
            value={input.title}
            onChange={changeHandler}
            required
          />
          <textarea
            type='text' 
            placeholder='Post here'
            name='submission_text'
            value={input.post_body}
            onChange={changeHandler}
            required 
          />
          {
            !!spinner && <LoginSpinner />
          }
          <button>Submit</button>
        </div>
      </form>
    </>
  )
}

const mapStateToProps = () => { 
  return {
  }
}
export default connect(
  mapStateToProps, 
  {getUserPosts, savingPosts, saveDSResponse, setPost}
)(PostForm);