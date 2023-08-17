import React, { useState } from 'react'

const RegisterPage = () => {
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')

  const submitRegister = async (e) => {
    e.preventDefault();
      const response = await fetch('http://localhost:8000/register' , {
        method: 'POST',
        body: JSON.stringify({username , password}),
        headers: { 'Content-Type': 'application/json'}
      });
      if(response.status === 200){
        alert('Registration Successful')
      }
      else{
        alert('Registration Failed')
      }
  }

  return (
    <form className='register' onSubmit={submitRegister}>
    <h1>Register</h1>
    <input type="text" placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
    <input type="password" placeholder='password' value={password} onChange={e =>setPassword(e.target.value)}/>
    <button>Register</button>
   </form>
  )
}

export default RegisterPage

