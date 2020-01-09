import Styled from 'styled-components'

export const PostCardContainer = Styled.div`
    border: 1px solid black;
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
`;
export const CardButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;