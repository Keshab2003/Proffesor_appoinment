import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import {useSelector , useDispatch} from "react-redux"
import {hideLoading , showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';
import { message } from 'antd';

export default function ProtectedRoute ({children}) {
  const dispatch = useDispatch();
  // const {user} = useSelector(state => state.user);

  //to get user
  

  useEffect(() => {
    const getUser = async() =>{
      try{
        // dispatch(showLoading());
        // const token = localStorage.getItem("token");
        //   if (!token) {
        //     console.log("No token found");
        //     return;
        //   }
        const res = await axios.post("http://localhost:8080/api/v1/user/getUserData",
       {token : localStorage.getItem("token")},
         {
          headers:{
            //space is required after Bearer
            Authorization :  "Bearer " + localStorage.getItem("token"),
          },
         });
  
        //  dispatch(hideLoading());
         if(res.status === 200 && res.data.success){
            dispatch(setUser(res.data.data)); 
         }
         else{
          <Navigate to="/login"/>
          localStorage.clear();
          console.error(res.data.message);
          
        }
  
  
      }catch(error){
        // dispatch(hideLoading());
        localStorage.clear();
        console.log(error);
      }
    };
    if(localStorage.getItem("token")){
      getUser();
    }
  }, [dispatch]);

  if(localStorage.getItem("token")){
    return children;
  }else{
    return <Navigate to="/login"/>
  }
}
