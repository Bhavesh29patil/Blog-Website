import React, { useEffect, useState } from 'react'
import Editor from '../Editor';
import { Navigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                })
            })
    }, [])

    const formEditHandler = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:8000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />
    }

    return (
        <div className='main'>
            <div className='edit-box'>

                <form onSubmit={formEditHandler}>
                    <h1>Edit Post</h1>
                    <div className='edit-description'>
                    <h5>Title</h5>
                    <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className='edit-description'>
                    <h5>Summary</h5>
                    <input type="text" placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} />
                    </div>
                    <div className='edit-description'>
                    <h5>Choose Image</h5>
                    </div>
                    <div className='edit-description'>
                    <input type="file" onChange={e => setFiles(e.target.files)} placeholder='Title' />
                    </div>
                    <div className='edit-description'>
                    <h5>Blog</h5>
                    <Editor className='quill' onChange={setContent} value={content} />
                    <button className='post-btn'>Edit Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPost