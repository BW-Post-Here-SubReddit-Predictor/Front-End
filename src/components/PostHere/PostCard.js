
import React, { useState } from 'react';

import Styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { savingPosts, deletePost, editPost } from '../../redux/actions'

import { connect } from 'react-redux'

import './PostCard.scss'


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
        savingPosts(item)
    }

    const handleDelete = ev => {
        deletePost(id)
    }

    const handleEdit = ev => {
        setModal(!modal)
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
        <div>
            <div>{item.title}</div>
            <div>{item.post}</div>
            <div>{item.subreddits.map((item, index) => (<div key={index}>{item.name}</div>))}
            </div>
            {
                history.location.pathname === '/Feed' ?
                    (<button onClick={handleSavePost}>save</button>)
                    :
                    null
            }

            {
                history.location.pathname === '/SavedPosts' && item.userId === localStorage.getItem('userId') ?
                    (
                        <>
                            <button onClick={handleDelete}>delete</button>
                            <button onClick={handleEdit}>edit</button>
                        </>
                    )
                    :
                    null
            }

        </div>
        {/* modal */}
        {
            modal &&         
                <div className='modal__modalBackground' onClick={handleEdit}>
                    <div className='modal__modalCont'>
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


        </>

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
// migrate styled components to divs in above component
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

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, {
    savingPosts,
    deletePost,
    editPost
})(PostCard);