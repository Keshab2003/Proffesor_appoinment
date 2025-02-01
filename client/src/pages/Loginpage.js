import React from 'react'
// import {Form ,Input} from "antd";
import "../styles/loginstyle.css"
// import Link from 'antd/es/typography/Link';
import {Link} from 'react-router-dom'
import {Form ,Input , message} from "antd";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import register from './Registerpage';

import {useDispatch} from 'react-redux';
import { showLoading , hideLoading } from '../redux/features/alertSlice';
// import { Dispatch } from './../../node_modules/redux/src/types/store';


const Loginpage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinishHandler = async (values) => {
        try{

            dispatch(showLoading());


            const res = await axios.post("http://localhost:8080/api/v1/user/login", values);

            dispatch(hideLoading());
            if(res.data.success){
                //generate token and save ifo in local storage
                localStorage.setItem("token" , res.data.token)


                message.success('Login Successfull');
                // navigate to the homepage
                navigate('/');
            }
            else{
                message.error(res.data.message);
            }
        }catch(error){
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    }

  return (
    <>
        <div className='form-container'>
            <Form className='login-form' layout='vertical' onFinish={onFinishHandler}>
                <h3 className='text-center'>Login Form</h3>
                

                <Form.Item label="Email" name="email">
                    <Input type="email" required/>
                </Form.Item>

                <Form.Item label="password" name="password">
                    <Input type="password" required/>
                </Form.Item>
                <Link to="/register" className='m-2'>{" "}Not a Registered User? Go for registration!</Link>
                <button className='btn btn-primary' type='submit'>Login</button>
            </Form> 
           
        </div>
    </>
  )
}

export default Loginpage