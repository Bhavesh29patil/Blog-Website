import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {

  const { setUserinfo, userinfo } = useContext(UserContext)

  useEffect(() => {
    fetch('http://localhost:8000/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserinfo(userInfo)
      })
    })
  }, [])

  const logoutHandler = () => {
    fetch('http://localhost:8000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserinfo(null);
  }

  const username = userinfo?.username;
  return (
    <div className="light-theme">
      <header>

        <div className="container">
          <nav className="navbar">
            <h1>
              <Link to='/' className='logo'>MyBlog</Link>
            </h1>
            {
              username && (
                <>
                <div className="flex-wrapper">
                  <ul class="desktop-nav">
                    <Link className="nav-link" onClick={logoutHandler}>Logout</Link>
                  </ul>
                </div>

                </>
                

              )
            }
            {!username && (
              <>
                {/* <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link> */}
              </>
            )}
          </nav>
        </div>
      </header>
    </div>

  )
}

export default Header;