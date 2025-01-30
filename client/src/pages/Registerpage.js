import React from 'react'
import {Form ,Input} from "antd";
import "../styles/registerstyle.css"
// import Link from 'antd/es/typography/Link';
import {Link} from 'react-router-dom'
import login from './Loginpage';

const Registerpage = () => {

    const onFinishHaandler = (values) => {
        console.log(values);
    }
  return (
    <>
        <div className='form-container'>
            <Form className='register-form' layout='vertical' onFinish={onFinishHaandler}>
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
  )
}

export default Registerpage