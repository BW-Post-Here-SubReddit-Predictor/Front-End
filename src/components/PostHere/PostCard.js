import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { savingPosts, deletePost } from '../../redux/actions'

import { connect } from 'react-redux'

import './PostCard.scss'


const PostCard = ({ item, savingPosts, id, deletePost }) => {
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
        setModal(true)
    }

    const handleInput = ev => {
        setModalInput({
            ...modalInput,
            [ev.target.name]: ev.target.value
        })
    }

    const submitEdit = ev => {
        ev.preventDefault()
        //
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
                <div className='modal__modalBackground'>
                    <div className='modal__modalCont'>
                        <form>
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
                        </form>
                    </div>
                </div>
        }


        </>
    )
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, {
    savingPosts,
    deletePost
})(PostCard);