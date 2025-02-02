import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import Layout from '../components/Layout';

const Homepage = () => {
  //get user data
  const getUserData =  async () => {
    try{

        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }



      const res = await axios.post("http://localhost:8080/api/v1/user/getUserData", {},
       {
        headers:{
          //space is required after Bearer
          Authorization :  "Bearer " + token,
        },
       });
       console.log(res);
    }catch(error){
      console.log(error);
    }


  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
    <h1>Homepage is right here </h1>
    </Layout>
  );
};

export default Homepage;