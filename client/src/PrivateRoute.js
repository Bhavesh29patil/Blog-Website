import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom'; 
import { UserContext } from './UserContext';


const PrivateRoute = ({children}) => {
  const { userinfo } = useContext(UserContext);
  
  const isAuthenticated = userinfo && userinfo.username;

  console.log(userinfo)
  console.log(isAuthenticated)

  return isAuthenticated ? children : <Navigate to={'/login'} />
};

export default PrivateRoute;

