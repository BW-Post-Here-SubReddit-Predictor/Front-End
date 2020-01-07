import React, { useState } from 'react'

import Styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginSpinner from '../Home/LoginSpinner';
import { axiosWithAuth } from '../../helpers/axiosWithAuth';
import { getUserPosts } from '../../redux/actions';

function PostForm(props) {
  const [input, setInput] = useState({
    post:''
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
    console.log('props', props);
    e.preventDefault();
    setSpinner(true)
    console.log('props', props);
    console.log('spinner state', spinner);
    axiosWithAuth().post('', input) //
      .then(res => {
        setSpinner(false)
        console.log(res)
        localStorage.setItem('', res.data) //
        console.log(res.data);
        getUserPosts(res.data);
        history.push('/user'); // 
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
            placeholder='Post here'
            name='post'
            value={props.post}
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
  {getUserPosts}
)(PostForm);