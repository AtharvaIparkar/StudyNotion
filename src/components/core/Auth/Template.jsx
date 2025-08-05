import React from 'react';
import SignupForm from '../Auth/SignupForm';
import LoginForm from '../Auth/LoginForm';
import frameImage from '../../../assets/Images/frame.png';
import {FcGoogle} from 'react-icons/fc';

const Template = ({title, des1, des2, image, formtype, setIsLoggedIn}) => {
  return (
    <div className='flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0'>
        <div className='w-11/12 max-w-[450px]'>
            <h1 className='text-richblack-5 font-semibold text-[1.875rem] l'>{title}</h1>
            <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                <span className='text-richblack-100'>{des1}</span>
                <br></br>
                <span className='text-blue-100 italic'>{des2}</span>
            </p>

            {formtype === "signup" ? (<SignupForm setIsLoggedIn={setIsLoggedIn}/>) : (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

            <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='w-full h-[1px] bg-richblack-700'></div>
                <p className='text-richblack-700 font-medium leading-[1.375rem]'>OR</p>
                <div className='w-full h-[1px] bg-richblack-700'></div>
            </div>

            <button className='w-full flex justify-center items-center font-medium text-richblack-100 bg-richblack-900 border border-richblack-100 rounded-[8px] px-[12px] py-[8px] gap-x-2 mt-6'>
                <FcGoogle />
                <p>Sign In with Google</p>
            </button>
        </div>

        <div className='relative w-11/12 max-w-[450px]'>
            <img src={frameImage} alt="Pattern" width={558} height={504} loading="lazy"></img>
            <img src={image} alt="Students" width={558} height={490} loading="lazy" className='absolute -top-4 right-4'></img>
        </div>
    </div>
  )
}

export default Template