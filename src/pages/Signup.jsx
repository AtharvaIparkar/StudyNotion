import React from 'react';
import signupImg from '../assets/Images/signup.webp';
import Template from '../components/core/Auth/Template';

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template 
        title="Join the millions learning to code with studyNotion for free"
        des1="Build skills for today, tomorrow and beyond."
        des2="Education to future-proof your career."
        image={signupImg}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup