import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {UserContext} from '../UserContext'

const PostPage = () => {
    const navigate = useNavigate();
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

  const deletePostHandler = async () => {
        try {
            const response = await fetch(`http://localhost:8000/post/${id}`, {
                credentials: 'include',
                method: 'DELETE',
            });

            if (response.ok) {
                alert('post deleted successfully')
                navigate('/')
            } else {
                alert('failed to delete')
            }
        } catch (e) {
            console.log('Error deleting post:', e);
        }
    };

    if (!postInfo) return '';

    return (
        <div className='out-post-page'>
        <div className='post-page'>
            <h1 className='post-page-title'>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}</time>

            <div className="author">
                <div className="author">
                    <span className="normal-font-weight">Author </span> <span className="bold-font-weight">
                        {/* {console.log(postInfo.author._id)} */}
                        <Link to={`/author/${postInfo.author.username}`}>{postInfo.author.username}</Link>
                    </span>
                </div>

            </div>
            {userinfo && userinfo.id === postInfo.author._id && (
                <div className="edit-post">
                    <Link className='edit-button' to={`/edit/${postInfo._id}`}>Edit the Post</Link>
                    <Link className='delete-button' onClick={deletePostHandler}>Delete Post</Link>
                </div>
            )}

            <div className='image'>
                <img src={`http://localhost:8000/${postInfo.cover}`} />
            </div>
            <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    </div>
    )
}

export default PostPage