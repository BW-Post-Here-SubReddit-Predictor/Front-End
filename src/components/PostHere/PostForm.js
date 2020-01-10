import React, { useState } from 'react'
import axios from 'axios';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginSpinner from '../Home/LoginSpinner';
import { getUserPosts, savingPosts, saveDSResponse, setPost } from '../../redux/actions';
import { FormContainer, FormItemContainer, TitleInput, TextInput, SubRedditCountContainer, SubRedditCountPrompt, SubRedditCount, ButtonContainer, SubmitButton} from './PostFormStyles'

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

  const setCountHandler = e => { 
    e.preventDefault()
    setInput({
      ...input, 
      return_count: Number(e.target.id)
    })
  }
  const submitPost = e => {
    e.preventDefault();
    setSpinner(true)
    axios
      .post('https://posthere-subreddit-ml-api.herokuapp.com/predict/', input) //
      .then(res => {
        setSpinner(false)
        console.log(res);
        props.saveDSResponse(res.data.predictions)
        props.setPost(input)
        console.log(res)

      })
      .catch(err => {
        console.log(err)
        history.push('/Error')
      })
  }

  return (
    <FormContainer>
      <form onSubmit={ submitPost } style={{width: "100%"}}>
        <div>
          <TitleInput
            type='text'
            placeholder='Title'
            name='title'
            value={input.title}
            onChange={changeHandler}
            required
          />
        </div>
        <div>
          <TextInput
            type='text' 
            placeholder='Post Text'
            name='submission_text'
            value={input.post_body}
            onChange={changeHandler}
            required 
          />
        </div>

        <SubRedditCountContainer> 
          <SubRedditCountPrompt>How many SubReddits should be returned?</SubRedditCountPrompt>
          <SubRedditCount onClick={setCountHandler} id="1" style={input.return_count === 1 ? { backgroundColor: "#FB2D08"} : {}}>1</SubRedditCount>
          <SubRedditCount onClick={setCountHandler} id="2" style={input.return_count === 2 ? { backgroundColor: "#FB2D08"} : {}}>2</SubRedditCount>
          <SubRedditCount onClick={setCountHandler} id="3" style={input.return_count === 3 ? { backgroundColor: "#FB2D08"} : {}}>3</SubRedditCount>
          <SubRedditCount onClick={setCountHandler} id="4" style={input.return_count === 4 ? { backgroundColor: "#FB2D08"} : {}}>4</SubRedditCount>
          <SubRedditCount onClick={setCountHandler} id="5" style={input.return_count === 5 ? { backgroundColor: "#FB2D08"} : {}}>5</SubRedditCount>
        </SubRedditCountContainer>
        
        <ButtonContainer>
          {
            !!spinner && <LoginSpinner className='crudBtn__spinner' />
          }
          <SubmitButton>Suggest</SubmitButton>
          
        </ButtonContainer>
      </form>
    </FormContainer>
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