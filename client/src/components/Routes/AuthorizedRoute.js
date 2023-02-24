import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import { selectLoggedInUser } from "../../redux/features/authSlice";
import jwtDecode from "jwt-decode";
import { Box, Typography}  from '@mui/material';

import TreeMenu from "./Menus/TreeMenu";

const AuthorizedRoute = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector(selectLoggedInUser);
  let role;
  const {UserInfo} = jwtDecode(accessToken)
  role = UserInfo.roles[0].toString()
  if(role === 'admin' || role === 'seller'){
    return (
      <>
        <Box>
          <Box>
            <ul>
              <li>dasad</li>
              <li>dasad</li>
              <li>dasad</li>
              <li>dasad</li>
            </ul>
          </Box>
          <Box>
            <Typography>Dashboard</Typography>
          </Box>
        </Box>
        <Box>
          <Box>
           <TreeMenu />
          </Box>
          <Box>
            <Box>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </>
    );
  }else{
    return <navigator to='/unauthorized'/>
  }

};

export default AuthorizedRoute;
