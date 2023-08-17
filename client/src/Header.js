import { useContext , useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {

  const {setUserinfo , userinfo} = useContext(UserContext)

  useEffect(()=>{
    fetch('http://localhost:8000/profile' , {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserinfo(userInfo)
      })
    })
  } , [])

  const logoutHandler = () => {
    fetch('http://localhost:8000/logout' , {
      credentials: 'include',
      method: 'POST',
    })
    setUserinfo(null);
  }

  const username = userinfo?.username;

    return(
        <header>
        <Link to='/' className='logo'>MyBlog</Link>
        <nav>
          {
            username && (
              <>
              <span>Welcome {username}</span>
              <Link to='/create'>Create new Post</Link>
              <Link onClick={logoutHandler}>Logout</Link>
              </>
            )
          }
          {!username && (
            <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            </>
          )}
          </nav>
          </header>
    )
}

export default Header;