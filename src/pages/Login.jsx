import React from 'react';
import Template from '../components/core/Auth/Template';
import loginImg from '../assets/Images/login.webp';

const Login = ({setIsLoggedIn}) => {
  return (
    <Template 
        title="Welcome Back"
        des1="Build skills for today, tomorrow and beyond."
        des2="Education to future-proof your career."
        image={loginImg}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login