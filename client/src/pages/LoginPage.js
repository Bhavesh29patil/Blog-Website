import React, { useState, useContext } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import './LogandSin.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUserinfo } = useContext(UserContext)

  const submitLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserinfo(userInfo)
        setRedirect(true)
      })
    }
    else {
      alert('wrong Credentials')
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="limiter">
      <div className="container-log-sin">
        <div className="wrap-log-sin">
          {/* <div class="log-sin-pic js-tilt" data-tilt> */}
          <h1 className="introtext">
            Welcome Back
            <br /> To <br />
            MyBlog
          </h1>
          {/* <img src="images/img-01.png" alt="IMG"> */}
          {/* </div> */}
          <form className="log-sin-form validate-form" onSubmit={submitLogin}>

            <span className="log-sin-form-title">LOGIN</span>
            <input className="text-box" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <span className="focus-text-box" />
            <span className="symbol-text-box">
              {/* <i className="fa fa-envelope" aria-hidden="true" /> */}
            </span>
            <input
              className="text-box" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            />
            <span className="focus-text-box" />
            <span className="symbol-text-box">
              {/* <i className="fa fa-lock" aria-hidden="true" /> */}
            </span>
              <div className="log-sin-btn">
              <button className="log-sin-form-btn">Login</button>

              </div>
            <div className="text-center ">
              <Link to={'/'} className='txt2'>
                <i className="fa fa-long-arrow-left m-l-5" aria-hidden="true" />&nbsp;
                Home
              </Link>
              &nbsp;{'|'}&nbsp;
              <Link className="txt2" to={'/register'}>
                Create your Account&nbsp;
                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default LoginPage;