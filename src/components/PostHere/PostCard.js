import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { savingPosts } from '../../redux/actions'

import { connect } from 'react-redux'


const PostCard = ({ item, savingPosts, id }) => {
    // component needs to expect id of a post that has yet to be assigned one
    // id should be conditionally passed in if PostCard is rendered from SavedPosts
    // SavedPosts get should retrieve object with id data
    const history = useHistory()

    const handleSavePost = ev => {
        savingPosts(item)
    }

    const handleDelete = ev => {

    }

    const handleEdit = ev => {
        
    }

    return (
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
    )
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, {
    savingPosts
})(PostCard);