import React, { useState } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { savingPosts, deletePost, editPost } from '../../redux/actions'
import { connect } from 'react-redux'
import './PostCard.scss'

const PostCardContainer = Styled.div`
    border: 1px solid black;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    background-color: white;
    width: 800px;
`;

const PostCardTitleContainer = Styled.div`
    display: flex;
    margin-bottom: 5px;
`;

const PostCardIcon = Styled.div`
    font-family: redditFont;
    font-size: 30px;
    color: #FB2D08;
`;

const PostCardTitle = Styled.div`
    font-size: 20px;
    color: #FB2D08;
    padding-left: 10px;
`;

const PostCardBody = Styled.div`
    min-height: 100px;
    padding: 5px;
    border-radius 4px;
    border: 1px solid #FB2D08;
    margin-bottom: 10px;
`;

const PostCardSectionHeader = Styled.div`
    background-color black;
    color: white;
    padding: 5px;
`;

const PostCardSection = Styled.div`
    border-left: 1px solid black;
    border-right 1px solid black;
    border-bottom: 1px solid black;
    padding: 5px;
    line-height: 30px;
`;

const CardButton = Styled.button`
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
const CardButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

const PostCard = ({ item, savingPosts, id, deletePost, editPost }) => {
    // component needs to expect id of a post that has yet to be assigned one
    // id should be conditionally passed in if PostCard is rendered from SavedPosts
    // SavedPosts get should retrieve object with id data

    const history = useHistory()
    const [modal, setModal] = useState(false)
    const [modalInput, setModalInput] = useState({
        title: item.title,
        post: item.post
    })


    const handleSavePost = ev => {
        console.log('called save post to backend')
        const saveItem = {
            post: item.post,
            title: item.title,
            subreddit: item.subreddits[0].name,
            user_id: Number(item.user_id)


        };
        savingPosts(saveItem) // item passed in needs to have the right structure
    }
    const handleDelete = ev => {
        deletePost(item.id)
    }
    const handleEdit = ev => {
        setModal(!modal)
        ev.stopPropagation()
    }
    const handleInput = ev => {
        setModalInput({
            ...modalInput,
            [ev.target.name]: ev.target.value
        })
    }
    const submitEdit = ev => {
        ev.preventDefault()
        const post = {
            ...item,
            title: modalInput.title,
            post: modalInput.post
        }
        editPost(post)
    }
    return (
        <>
        {/* card */}
        <PostCardContainer>
            <PostCardTitleContainer>
                <PostCardIcon>&#xF13A;</PostCardIcon>
                <PostCardTitle>{item.title}</PostCardTitle>
            </PostCardTitleContainer>

            <PostCardBody>{item.post}</PostCardBody>
            
            <PostCardSectionHeader>Suggested SubReddits</PostCardSectionHeader>
            <PostCardSection>
                {
                    history.location.pathname === '/Savedposts' ? 
                        (<a target="_blank" href={"http://reddit.com/r/" + item.subreddit}>r/{item.subreddit}</a>)
                        : null 
                }
                {
                    history.location.pathname === '/Feed' ?
                        item.subreddits.map((subreddit, index) => (
                            <div key={index}>
                                <a target="_blank" href={"http://reddit.com/r/" + subreddit.name} key={index}>r/{subreddit.name}</a>
                            </div>)
                            )
                        :
                        null

                }
            </PostCardSection>
            <CardButtonContainer>
                {
                    history.location.pathname === '/Feed' ?
                        (<CardButton onClick={handleSavePost}>Save</CardButton>)
                        :
                        null
                }
                {
                    history.location.pathname === '/Savedposts' && Number(item.user_id) === Number(localStorage.getItem('userId')) ?
                        (
                            <>
                                <CardButton onClick={handleDelete}>Delete</CardButton>
                                <CardButton onClick={handleEdit}>Edit</CardButton>
                            </>
                        )
                        :
                        null
                }
            </CardButtonContainer>
        </PostCardContainer>

        {/* modal */}
        {
            modal &&         
                <div className='modal__modalBackground' onClick={handleEdit}>
                    <div className='modal__modalCont' onClick={ev => ev.stopPropagation()}>
                        <form onSubmit={submitEdit}>
                            <input 
                            placeholder='title' 
                            value={modalInput.title}
                            onChange={handleInput}
                            name='title'
                            />
                            <input 
                            placeholder='post body' 
                            value={modalInput.post}
                            onChange={handleInput}
                            name='post'
                            />
                            <button>Submit Changes</button>
                        </form>
                    </div>
                </div>
        }
        </>);
}
const mapStateToProps = state => {
    return {}
}
export default connect(mapStateToProps, {
    savingPosts,
    deletePost,
    editPost
})(PostCard);
