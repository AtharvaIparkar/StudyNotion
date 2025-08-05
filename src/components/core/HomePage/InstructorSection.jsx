import React from 'react'
import InsructorImage from '../../../assets/Images/Instructor.png'
import HighLightText from '../HomePage/HighLightText'
import CTAButton from '../HomePage/Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
            <div className="absolute -top-5 -left-5 w-[47%] h-full bg-white z-0 hidden lg:block"></div>

            <div className="w-full lg:w-[50%] relative z-10">
                <img
                src={InsructorImage}
                alt=""
                className="w-full max-w-[400px] lg:max-w-none mx-auto lg:mx-0"
                />
            </div>

            <div className='w-full lg:w-[50%] flex flex-col gap-10'>
                <div className='text-2xl md:text-4xl font-semibold text-center lg:text-left'>
                    Become an
                    <HighLightText text={"Instructor"} />
                </div>

                <p className='font-medium text-[16px] w-full lg:w-[90%] text-richblack-300 text-center lg:text-left'>
                    Instructors from around the world teach millions of students of StudyNotion. We provide the
                    tools and skills to teach what you love.
                </p>

                <div className='w-fit mx-auto lg:mx-0'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 items-center'>
                            Start Learning Today
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection