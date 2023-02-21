import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import { selectLoggedInUser } from "../../redux/features/authSlice";
import jwtDecode from "jwt-decode";

const AuthorizedRoute = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector(selectLoggedInUser);
  let role;
  const {UserInfo} = jwtDecode(accessToken)
  role = UserInfo.roles[0].toString()
  if(role === 'admin' || role === 'seller'){
    return <Outlet />
  }else{
    return <navigator to='/unauthorized'/>
  }

};

export default AuthorizedRoute;
