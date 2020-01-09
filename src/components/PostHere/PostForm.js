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
  border: 1px solid darksmoke;
  border-radius 4px;
  margin-bottom: 5px;
  border-style: none;
  padding: 5px;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TextInput = Styled.textarea`
  box-sizing : border-box;
  width: 100%;
  height: 200px;
  font-size: 18px;
  resize: none;
  border-style: none;
  padding: 5px;
  border-radius 4px;
  border: 1px solid #FB2D08;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    &:hover {
        background-color:#ff6314;
    }
`;

const ButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;


const List = Styled.li`
   list-style-type : none
   background-color: black;
   color: white; 
   width: 12%;
   height: 5%;
   margin: auto;
   padding-left: 60px;
   border-radius: .35rem
   &:hover {

    background-color: red
    width: 14%
    height: 7%;
    padding-left: 80px;
    font-size: 1.35rem;
    
  }


`
const List1 = Styled.li`
   list-style-type : none
   background-color: black;
   color: white;
   width: 20%;
   height: 5%;
   margin: auto;
   padding-left: 20px;
   &:hover {

    background-color: red
    
  }
  font-size: 1.4rem;
  border-radius: .35rem
   

`


function PostForm(props) {
  const [input, setInput] = useState({
    submission_text:'',
    title:'',
    return_count: 3 // needs dropdown selection to set return count
  });
  const [spinner, setSpinner] = useState(false);
  const [istrue, setIstrue] = useState(false); 
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
      return_count: Number(e.target.name)
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
        <div>
          <ul> 
            {!istrue ? 
            <List1 onClick={() => setIstrue(true)}>click # of subreddits</List1> 
            : 
            <>

              <List onClick={setCountHandler} name="1">1</List>
              <List onClick={setCountHandler} name="3">3</List>
              <List onClick={setCountHandler} name="5">5</List>
              <List onClick={setCountHandler} name="10">10</List>
              <List onClick={setCountHandler} name="20">20</List>

            </>
            }
          </ul>
        </div>

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