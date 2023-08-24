import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const [email , setEmail] = useState('')

  const emailHandler = (e) => {
    setEmail(e.target.value);
}

  const submitRegister = async (e) => {
    e.preventDefault();
      const response = await fetch('http://localhost:8000/register' , {
        method: 'POST',
        body: JSON.stringify({username , password , email}),
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
  <div className="limiter">
  <div className="container-log-sin">
    <div className="wrap-log-sin">
      {/* <div class="log-sin-pic js-tilt" data-tilt> */}
      <h1 className="introtext">
        Welcome
        <br /> To <br />
        MyBlog
      </h1>
      {/* <img src="images/img-01.png" alt="IMG"> */}
      {/* </div> */}
      <form className="log-sin-form validate-form" onSubmit={submitRegister}>
        <span className="log-sin-form-title">Register</span>
        <input className="text-box" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <span className="focus-text-box" />
        <span className="symbol-text-box">
          {/* <i className="fa fa-envelope" aria-hidden="true" /> */}
        </span>
        <input className="text-box" type="email" placeholder='Email-ID' value={email} required onChange={emailHandler}/>
        <input
          className="text-box" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
        />
        <span className="focus-text-box" />
        <span className="symbol-text-box">
          {/* <i className="fa fa-lock" aria-hidden="true" /> */}
        </span>
        <div className="container-log-sin-form-btn">
          <button className="log-sin-form-btn">Register</button>
        </div>
        <div className="text-center ">
          <Link className="txt2" to={'/'}>
            <i className="fa fa-long-arrow-left m-l-5" aria-hidden="true" />&nbsp;
            Home  
          </Link>
           &nbsp;{'|'}&nbsp;
          <Link className="txt2" to={'/login'}>
              Already Have an Account?&nbsp;
            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
          </Link>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default RegisterPage

