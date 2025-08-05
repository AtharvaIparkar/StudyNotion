import React from 'react';
import {Link} from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa';
import HighlightText from '../components/core/HomePage/HighLightText';

import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';


const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-center'>
            <Link to={'/signup'}>
                <div className="group mt-16 p-[1px] mx-auto w-fit rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 cursor-pointer border-b border-richblack-600">
					<div className="flex items-center gap-2 rounded-full bg-richblack-800 px-8 py-2 group-hover:bg-richblack-900 transition-all duration-200">
						<p>Become an Instructor</p>
						<FaArrowRight className="text-sm" />
					</div>
					</div>
            </Link>

            <div className='text-center font-semibold text-2xl md:text-4xl mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className='w-[90%] text-center text-base md:text-lg font-bold text-richblack-300 mt-4'>
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
            </div>

            <div className='flex flex-col md:flex-row gap-4 md:gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>
			
			<div className="relative mx-3 my-12">
				<div className="absolute top-2 left-3 w-full max-w-6xl h-[200px] md:h-[353px] bg-white z-0 shadow-md"></div>

				<video
					className="w-full max-w-6xl h-[200px] md:h-[350px] relative z-10 shadow-[-10px_-10px_40px_rgba(8,_112,_184,_0.3)]"
					muted
					loop
					autoPlay
				>
					<source src={Banner} type="video/mp4" />
				</video>
			</div>



			{/* Code Section 1 */}
			<div>
				<CodeBlocks 
					position={"lg:flex-row"}
					heading={
						<div className='text-2xl md:text-4xl font-bold'>
							Unlock Your
							<HighlightText text={"coding potential"} />
							with our online courses 
						</div>
					}
					subheading={
						"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
					}
					ctabtn1={
						{
							btnText: "Try it yourself",
							linkto: "/signup",
							active: true,
						}
					}
					ctabtn2={
						{
							btnText: "Learn more",
							linkto: "/login",
							active: false,
						}
					}
					codeColor={"text-yellow-25"}
					codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
					backgroundGradient={<div className="codeblock1 absolute"></div>}
				/>
			</div>

			{/* Code Section 2 */}
			<div>
				<CodeBlocks 
					position={"lg:flex-row-reverse"}
					heading={
						<div className='text-2xl md:text-4xl font-bold'>
							Start
							<HighlightText text={"coding in seconds"} />
						</div>
					}
					subheading={
						"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
					}
					ctabtn1={
						{
							btnText: "Continue Lesson",
							linkto: "/signup",
							active: true,
						}
					}
					ctabtn2={
						{
							btnText: "Learn more",
							linkto: "/login",
							active: false,
						}
					}
					codeColor={"text-white"}
					codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
					backgroundGradient={<div className="codeblock2 absolute"></div>}
				/>
			</div>

			<ExploreMore />

        </div>

        {/* Section 2 */}
		<div className='bg-pure-greys-5 text-richblack-700'>
			<div className='homepage_bg h-[333px]'>
				<div className='h-[220px]'></div>
				<div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto'>
					<div className='flex flex-col md:flex-row gap-4 md:gap-7 text-white'>
						<CTAButton active={true} linkto={"/signup"} >
							<div className='flex items-center gap-3'>
								Explore full Catalog
								<FaArrowRight/>
							</div>
						</CTAButton>
						<CTAButton active={false} linkto={"/signup"} >
							<div>
								Learn more
							</div>
						</CTAButton>
					</div>
				</div>
			</div>

			<div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
					<div className='flex flex-col lg:flex-row gap-8 lg:gap-32 mb-10 mt-[95px] lg:ml-20'>
						<div className='text-2xl md:text-4xl font-semibold w-full lg:w-[45%]'>
							Get the skills you need for a
							<HighlightText text={"Job in a demand"} />
						</div>

						<div className='flex flex-col gap-6 lg:gap-10 w-full lg:w-[40%] items-start'>
							<div className='text-[16px]'>
								The modern StudyNotion is the dectates its own terms. Today, to be a competative
								specialist requires more than professional skills.
							</div>
							<CTAButton active={true} linkto={"/signup"}>
								<div>
									Learn more
								</div>
							</CTAButton>
						</div>
					</div>					
					

				<TimelineSection />

				<LearningLanguageSection />
			</div>
		</div>
        
        
        {/* Section 3 */}
		<div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8
						first-letter: bg-richblack-900 text-white'>
			
			<InstructorSection />

			<h2 className='text-center text-2xl md:text-4xl font-semibold mt-10'>Reviews from other Learners</h2>
			{/* Review Slider here */}
			<ReviewSlider />
		</div>
        
        
        {/* Footer */}
		<Footer />
    </div>
  )
}

export default Home