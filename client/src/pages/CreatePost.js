import React, { useState } from 'react'
import {Navigate} from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import Editor from '../Editor'

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files , setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  const formSubmitHandler = async (e) => {
    const data = new FormData();
    data.set('title' , title);
    data.set('summary' , summary);
    data.set('content' , content);
    data.set('file' , files[0]);
    e.preventDefault();
    const response  = await fetch("http://localhost:8000/post" , {
      method : 'POST',
      body : data,
      credentials: 'include',
    })
    if(response.ok){
      setRedirect(true);
    } 
  }

  if(redirect){
  return <Navigate to={'/'} />
  }

  return (
    <div className='main'>
      <h1>Create Post</h1>
    <form onSubmit={formSubmitHandler}>
      <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
      <input type="text"  placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} />
      <input type="file"  onChange={e => setFiles(e.target.files)} placeholder='Title' />
      <Editor className='quill' value={content} onChange={setContent}/>

      <button >Create Post</button>
    </form>
    </div>
  )
}

export default CreatePost