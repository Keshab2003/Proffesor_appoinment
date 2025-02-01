import React from 'react'
import {Form ,Input , message} from "antd";
import "../styles/registerstyle.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Link from 'antd/es/typography/Link';
import {Link} from 'react-router-dom'
// import login from './Loginpage';

import {useDispatch} from 'react-redux';
import { showLoading , hideLoading } from '../redux/features/alertSlice';

const Registerpage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinishHandler = async (values) => {
        try{
            dispatch(showLoading());
            const res = await axios.post("http://localhost:8080/api/v1/user/register", values);
            dispatch(hideLoading());
            if(res.data.success){
                message.success('Registration Successfull');
                navigate('/login');
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
            <Form className='register-form' layout='vertical' onFinish={onFinishHandler}>
                <h3 className='text-center'>Register Form</h3>
                <Form.Item label="Name" name="name">
                    <Input type="text" required/>
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input type="email" required/>
                </Form.Item>

                <Form.Item label="password" name="password">
                    <Input type="password" required/>
                </Form.Item>
                <Link to="/login" className='m-2'>{" "}Already registered ? Go for Login</Link>
                <button className='btn btn-primary' type='submit'>Register</button>
            </Form> 
           
        </div>

    </>
  );
};

export default Registerpage;



