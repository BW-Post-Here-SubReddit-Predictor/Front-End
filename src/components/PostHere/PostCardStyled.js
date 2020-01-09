import Styled from 'styled-components'

export const PostCardContainer = Styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    background-color: white;
    width: 800px;
`;

export const PostCardTitleContainer = Styled.div`
    display: flex;
    margin-bottom: 5px;
`;

export const PostCardIcon = Styled.div`
    font-family: redditFont;
    font-size: 30px;
    color: #FB2D08;
`;

export const PostCardTitle = Styled.div`
    font-size: 20px;
    color: #FB2D08;
    padding-left: 10px;
`;

export const PostCardBody = Styled.div`
    min-height: 100px;
    padding: 5px;
    border-radius 4px;
    border: 1px solid #FB2D08;
    margin-bottom: 10px;
`;

export const PostCardSectionHeader = Styled.div`
    background-color black;
    color: white;
    padding: 5px;
`;

export const PostCardSection = Styled.div`
    border-left: 1px solid black;
    border-right 1px solid black;
    border-bottom: 1px solid black;
    padding: 5px;
    line-height: 30px;
`;

export const CardButton = Styled.button`
    box-sizing: border-box;
    background-color: #0067B8;
    color: white;
    width: 110px;
    height: 45px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    margin-left: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    &:hover {
        background-color:#ff6314;
    }
`;
export const CardButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;
export const ModalBackground = Styled.div`
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    margin: 0px auto;
    display: flex;
    align-items: center;
`;
export const ModalEditForm = Styled.form`
    margin: 0 auto;
    width: 600px;
    height: 205px;
    background-color: white;
    border: 5px solid black;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

export const ModalEditFormTextEdit = Styled.input`
    color: #FB2D08;
    outline: none;
    font-size: 20px;
`;

export const ModalEditFormTextArea = Styled.textarea`
    min-height: 100px;
    padding: 5px;
    border-radius 4px;
    border: 1px solid #FB2D08;
    margin-bottom: 0px;
    outline: none;
    margin-top: 5px;
    font-size: 15px;
    resize: none;
`;