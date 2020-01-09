import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { savingPosts, deletePost, editPost } from '../../redux/actions'
import { connect } from 'react-redux'
import Styled from 'styled-components'
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
    CardButtonContainer,
    ModalBackground,
    ModalEditForm,
    ModalEditFormTextEdit,
    ModalEditFormTextArea
} from './PostCardStyled'

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
