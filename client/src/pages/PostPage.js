import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {UserContext} from '../UserContext'

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null)
    const {userinfo} = useContext(UserContext)
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:8000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo)
                })
            })
    }, []);

    if (!postInfo) return '';

    return (
        <div className='post-page'>
            <h1>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}</time>

            <div className="author">
                <div className="author">
                    <span className="normal-font-weight">Author </span> <span className="bold-font-weight">{postInfo.author.username}</span>
                </div>

            </div>

            {userinfo.id === postInfo.author._id && (
                <div className="edit-post">
                    <Link className='edit-button' to={`/edit/${postInfo._id}`}>Edit the Post</Link>
                </div>
            )}

            <div className='image'>
                <img src={`http://localhost:8000/${postInfo.cover}`} />
            </div>
            <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    )
}

export default PostPage