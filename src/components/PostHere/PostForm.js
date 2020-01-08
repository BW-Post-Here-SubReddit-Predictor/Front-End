import React, { useState } from 'react'
import axios from 'axios';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginSpinner from '../Home/LoginSpinner';
import { getUserPosts, savingPosts, saveDSResponse, setPost } from '../../redux/actions';

const FormContainer = Styled.div`
  display: flex;
  align-items: column;
`;

const TitleInput = Styled.input`
  box-sizing : border-box;
  width: 100%;
  font-size: 20px;
`;

const TextInput = Styled.textarea`
  box-sizing : border-box;
  width: 100%;
  height: 200px;
  font-size: 18px;
  resize: none;
`;

const SubmitButton = Styled.button`
    box-sizing: border-box;
    background-color: #0067b8;
    color: white;
    width: 110px;
    height: 45px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
`;

const ButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

function PostForm(props) {
  const [input, setInput] = useState({
    submission_text:'',
    // title:'',
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
            placeholder='Post here'
            name='submission_text'
            value={input.post_body}
            onChange={changeHandler}
            required 
          />
        </div>
          {
            !!spinner && <LoginSpinner />
          }
        <ButtonContainer>
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