import React from 'react'
import {Form ,Input} from "antd";
import "../styles/loginstyle.css"
// import Link from 'antd/es/typography/Link';
import {Link} from 'react-router-dom'
import register from './Registerpage';

const Loginpage = () => {
    const onFinishHaandler = (values) => {
        console.log(values);
    }

  return (
    <>
        <div className='form-container'>
            <Form className='login-form' layout='vertical' onFinish={onFinishHaandler}>
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