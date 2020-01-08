import React from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const PostCardContainer = Styled.div`
    background-color: white;
    border: 1px solid #FB2D08;
    margin-top: 20px;
`;

const PostCardSection = Styled.div`
    border-bottom: 1px solid #FB2D08;
    padding: 5px;
    line-height: 30px;
`;

const CardButton = Styled.button`
    box-sizing: border-box;
    background-color: #0067b8;
    color: white;
    width: 110px;
    height: 45px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    margin-left: 5px;
`;

const CardButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

const PostCard = ({ postInfo }) => {
    const history = useHistory() // TBD: Conditional rendering of Save/Edit/Delete

    return (<>
        <PostCardContainer>
            <PostCardSection>{postInfo.title}</PostCardSection>
            <PostCardSection>{postInfo.post}...</PostCardSection>
            <PostCardSection>
                {
                    postInfo.subreddits.map((subreddit, index) => (
                        <div>
                            <a target="_blank" href={"http://reddit.com/r/" + subreddit.name} key={index}>r/{subreddit.name}</a>
                        </div>)
                    )
                }
            </PostCardSection>
        </PostCardContainer>
        <CardButtonContainer>
            <CardButton>Save</CardButton>
            <CardButton>Edit</CardButton>
            <CardButton>Delete</CardButton>
        </CardButtonContainer></>
    )
}

export default PostCard;