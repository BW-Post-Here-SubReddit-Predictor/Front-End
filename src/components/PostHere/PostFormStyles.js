import Styled from 'styled-components'

export const FormContainer = Styled.div`
  display: flex;
  align-items: column;
  width: 800px;
  margin: 0 auto;
`;

export const TitleInput = Styled.input`
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

export const TextInput = Styled.textarea`
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

export const SubmitButton = Styled.button`
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
      background-color: #FB2D08;
  }
`;

export const ButtonContainer = Styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const SubRedditCountContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-top: 5px;
`
export const SubRedditCount = Styled.div`
  background-color: black;
  color: white; 
  border-radius: 5px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 2px solid black;
  &:hover {
    border: 2px solid #FB2D08;
  }
`
export const SubRedditCountValue = Styled.div`
  background-color: black;
  color: white;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 5px;
  padding-top: 5px;
  border-radius: 5px;
  text-align: center;
`;

export const SubRedditCountPrompt = Styled.div`
  font-size: 18px;
  padding-top: 3px;
`;