import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { savingPosts, deletePost, editPost } from '../../redux/actions'
import { connect } from 'react-redux'
import './PostCard.scss'
import LoginSpinner from '../Home/LoginSpinner'
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
const PostCard = ({ item, savingPosts, deletePost, editPost, storeIsSaving, storeIsDeleting, storeIsEditing }) => {
    // component needs to expect id of a post that has yet to be assigned one
    // id should be conditionally passed in if PostCard is rendered from SavedPosts
    // SavedPosts get should retrieve object with id data

    const history = useHistory()
    const [modal, setModal] = useState(false)
    const [modalInput, setModalInput] = useState({
        title: item.title,
        post: item.post
    })
    // local spinner state to identify card
    const [isSavingPost, setIsSavingPost] = useState(false)
    const [isEditingPost, setIsEditingPost] = useState(false)
    const [isDeletingPost, setIsDeletingPost] = useState(false)

    useEffect(() => {
        // reset state logic after req fulfillment
        if(!storeIsSaving) {
            setIsSavingPost(false)
        }
        if(!storeIsDeleting) {
            setIsDeletingPost(false)
        }
        if(!storeIsEditing) {
            setIsEditingPost(false)
        }
    }, [storeIsSaving, storeIsDeleting, storeIsEditing])

    const handleSavePost = ev => {
        setIsSavingPost(true)
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
        setIsDeletingPost(true)
        deletePost(item.id)
    }
    const handleEdit = ev => {
        setIsEditingPost(true)
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
        setModal(false)
    }
    return (
        <>
        {/* card */}
        <PostCardContainer>
            <PostCardSection>{item.title}</PostCardSection>
            <PostCardSection>{item.post}</PostCardSection>
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
        </PostCardContainer>
        {/* save button */}
        <CardButtonContainer>
            {
                storeIsSaving && isSavingPost ?
                    (<LoginSpinner />)
                    :
                    null
            }
            {
                history.location.pathname === '/Feed' ?
                    (<CardButton onClick={handleSavePost}>Save</CardButton>)
                    :
                    null
            }
        </CardButtonContainer>
        {/* delete button */}
        <CardButtonContainer>
            {
                storeIsDeleting && isDeletingPost ?
                    (<LoginSpinner />)
                    :
                    null
            }
            {
                history.location.pathname === '/Savedposts' && Number(item.user_id) === Number(localStorage.getItem('userId')) ?
                    (<CardButton onClick={handleDelete}>Delete</CardButton>)
                    :
                    null
            }
        </CardButtonContainer>
        {/* edit button */}
        <CardButtonContainer>
            {
                storeIsEditing && isEditingPost ?
                    (<LoginSpinner />)
                    :
                    null
            }
            {
                history.location.pathname === '/Savedposts' && Number(item.user_id) === Number(localStorage.getItem('userId')) ?
                    (<CardButton onClick={handleEdit}>Edit</CardButton>)
                    :
                    null
            }
        </CardButtonContainer>
    
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
const mapStateToProps = ({ serverReducer }) => {
    return {
        storeIsSaving: serverReducer.isPostingNewSavedPost,
        storeIsDeleting: serverReducer.isDeletingPost,
        storeIsEditing: serverReducer.isEditingPost
    }
}
export default connect(mapStateToProps, {
    savingPosts,
    deletePost,
    editPost
})(PostCard);
