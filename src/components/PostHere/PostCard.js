import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { savingPosts, deletePost, editPost } from '../../redux/actions'
import { connect } from 'react-redux'
import LoginSpinner from '../Home/LoginSpinner'
//Styled Components

import {
    PostCardContainer,
    PostCardTitleContainer,
    PostCardIcon,
    PostCardTitle,
    PostCardBody,
    PostCardSectionHeader,
    PostCardSection,
    CardButton,
    CardButtonContainer
} from './PostCardStyled'

const ModalBackground = Styled.div`
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

const ModalEditForm = Styled.form`
    margin: 0 auto;
    width: 600px;
    height: 205px;
    background-color: white;
    border: 5px solid black;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

const ModalEditFormTextEdit = Styled.input`
    color: #FB2D08;
    outline: none;
    font-size: 20px;
`;

const ModalEditFormTextArea = Styled.textarea`
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
    const [isSavingPost, setIsSavingPost] = useState('Not Saved')
    // Not Saved - Saving - Saved
    const [isEditingPost, setIsEditingPost] = useState(false)
    const [isDeletingPost, setIsDeletingPost] = useState(false)

    useEffect(() => {
        // reset state logic after req fulfillment
        if(!storeIsSaving && isSavingPost === 'Saving') {
            setIsSavingPost('Saved')
        }
        if(!storeIsDeleting) {
            setIsDeletingPost(false)
        }
        if(!storeIsEditing) {
            setIsEditingPost(false)
        }
        console.log('use effect on mount?')
    }, [storeIsSaving, storeIsDeleting, storeIsEditing])

    const handleSavePost = ev => {
        console.log('is Saving Post Before handle', isSavingPost)
        setIsSavingPost('Saving')
        console.log('is Saving Post After handle', isSavingPost)
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
        setModalInput({
            title: item.title,
            post: item.post
        })
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
                    storeIsSaving && isSavingPost === 'Saving' ?
                        (<LoginSpinner />)
                        :
                        null
                }
                {
                    storeIsDeleting && isDeletingPost ?
                        (<LoginSpinner />)
                        :
                        null
                }
                {
                    storeIsEditing && isEditingPost ?
                        (<LoginSpinner />)
                        :
                        null
                }


                {
                    history.location.pathname === '/Feed' && isSavingPost === 'Not Saved' ?
                        (<CardButton onClick={handleSavePost}>Save</CardButton>)
                        :
                        null
                }
                {
                    isSavingPost === 'Saved' ?
                    (<div>Saved Successfully!</div>)
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

        {/* save button */}
        {/* <CardButtonContainer>
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
        </CardButtonContainer> */}
        {/* delete button */}
        {/* <CardButtonContainer>
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
        </CardButtonContainer> */}
        {/* edit button */}
        {/* <CardButtonContainer>
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
        </CardButtonContainer> */}
    
        {/* modal */}
        {
            modal &&         
                <ModalBackground onClick={handleEdit}>
                    <ModalEditForm onClick={ev => ev.stopPropagation()} onSubmit={submitEdit}>
                        <ModalEditFormTextEdit 
                            placeholder='title' 
                            value={modalInput.title}
                            onChange={handleInput}
                            name='title'
                        />
                        <ModalEditFormTextArea
                            placeholder='post body' 
                            value={modalInput.post}
                            onChange={handleInput}
                            name='post'
                        />
                        <CardButtonContainer>
                            <CardButton>Save</CardButton>
                        </CardButtonContainer>
                    </ModalEditForm>
                </ModalBackground>
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
