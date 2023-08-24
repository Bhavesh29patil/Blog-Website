import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "./UserContext";

const Welcome = () => {
    const {userinfo} = useContext(UserContext);
    const username = userinfo?.username;
  return (
    <div className="hero">
      <div className="container">
        <div className="left">
          <h1 className="h1">Welcome<b> {username}&nbsp;</b></h1>
          <div className="btn-group">
          <Link className="btn btn-primary" to={`/author/${username}`}>My Posts</Link>
          <Link className="btn btn-secondary" to='/create'>Create new Post</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
