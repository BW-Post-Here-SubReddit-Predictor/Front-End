import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { savingPosts } from '../../redux/actions'

import { connect } from 'react-redux'


const PostCard = ({ item, savingPosts }) => {
    const history = useHistory()
    
    const handleSavePost = ev => {
        savingPosts(item)
    }
  
    useEffect(() => {
        console.log(item, 'item')
    }, [item])
    return (
        <div>
            <div>{item.name}</div>
            {/* <div>{item.prob}</div> */}
            {/* <div>{item.map((item, index) => (<div key={index}>{item.name}</div>))} */}
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
                            <button>delete</button>
                            <button>edit</button>
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