import React from 'react';
import { useHistory } from 'react-router-dom';



const PostCard = ({ item }) => {
    const history = useHistory()

    return (
        <div>
            <div>{item.title}</div>
            <div>{item.post_body}</div>
            <div>{item.subreddits.map((item, index) => (<div key={index}>{item.name}</div>))}
            </div>
            <button>save</button>
            <button>edit</button>
            <button>delete</button>
        </div>
    )
}

export default PostCard;