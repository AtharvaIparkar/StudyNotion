import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the Problem",
        Description: "Code your way to a solution",
    },
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-10 lg:gap-20 items-center'>
            <div className='w-full lg:w-[45%] flex flex-col gap-5'>
                {
                    timeline.map((element, index) => {
                        return (
                        <div className='flex flex-row gap-6' key={index}>
                            <div className='flex flex-col items-center'>
                                <div className='w-[55px] h-[55px] bg-white flex items-center justify-center rounded-full'>
                                    <img src={element.Logo} />
                                </div>

                                <div
                                    className={`w-[2px] h-14 border-l border-dotted border-richblack-200 mt-3 ${
                                    index === timeline.length - 1 ? "hidden" : ""
                                    }`}
                                />
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>
                        </div>
                        );
                    })
                }

            </div>

            <div className="relative w-fit mx-auto">
                <div className="absolute top-5 left-5 w-full h-full bg-white z-0 shadow-[-10px_-10px_40px_rgba(0,_0,_0,_0.1)]"></div>

                <img
                    src={TimelineImage}
                    alt="timeline"
                    className="relative z-10 shadow-blue-200 shadow-[-10px_-10px_30px_-10px] w-full max-w-[400px] lg:max-w-none"
                />

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-caribbeangreen-700 text-white uppercase flex flex-col md:flex-row shadow-md z-20">
                    <div className="flex items-center gap-4 border-r border-caribbeangreen-300 px-6 md:px-10 py-4 md:py-8">
                        <p className="text-2xl md:text-3xl font-bold">10</p>
                        <p className="text-caribbeangreen-300 text-xs md:text-sm">Years<br />Experiences</p>
                    </div>
                    <div className="flex items-center gap-4 px-6 md:px-8 py-4 md:py-6">
                        <p className="text-2xl md:text-3xl font-bold">250</p>
                        <p className="text-caribbeangreen-300 text-xs md:text-sm">Types of<br />Courses</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TimelineSection