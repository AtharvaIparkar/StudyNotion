const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const CourseProgress = require('../models/CourseProgress');
const {convertSecondsToDuration} = require('../utils/secToDuration');

// create Course handler function
exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category, tag} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All feilds are required",
            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details : ", instructorDetails);

        if(!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found",
            })
        }

        // check given category is valid or not 
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "category details not found",
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        
        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            studentsEnrolled: [],
        });

        // add the new course to the user schemaa of instructor
        await User.findByIdAndUpdate(
            instructorDetails._id,
            {
                $push: {
                   courses: newCourse._id,
                }
            },
            {new: true},
        );

        // update the category ka schema
        // TODO : hw
        await Category.findByIdAndUpdate(
            categoryDetails._id,
            {
                $push: {
                   courses: newCourse._id, 
                }
            },
            {new: true},
        );

        // return response
        return res.status(200).json({
                success: true,
                message: "Course created successfully",
                data: newCourse,
            })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        })
    }
}

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (Object.prototype.hasOwnProperty.call(updates, key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

// getAllCourses handler function
exports.getAllCourses = async (req, res) => {
    try {
        // TODO: change the below statement incrementally
        const allCourses = await Course.find({}); 
                                                // {courseName:true,
                                                // price: true,
                                                // thumbnail: true,
                                                // instructor: true,
                                                // ratingAndReviews: true,
                                                // studentEnrolled: true,})
                                                // .populate("instructor")
                                                // .exec();
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
        })
    }
};

// getCoursesDetails
exports.getCourseDetails = async (req, res) => {
    try {
        // get id
        const {courseId} = req.body;
        // find course details
        const courseDetails = await Course.findOne(
                                        {_id: courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate: {
                                                    path: "additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        .populate("ratingAndReviews")
                                        .populate({
                                            path: "courseContent",
                                            populate: {
                                                path: "subSection",
                                            },
                                        })
                                        .exec();
        // validation
        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            })
        }
        // return res
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideo
            ? courseProgressCount?.completedVideo
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  // Get a list of Course for a given Instructor
  exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor with populated category and course content
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      }).populate("category").sort({ createdAt: -1 })
  
      // Calculate total duration for each course
      const coursesWithDuration = instructorCourses.map(course => {
        let totalDurationInSeconds = 0
        
        // Calculate total duration from all subsections
        course.courseContent.forEach(section => {
          section.subSection.forEach(subSection => {
            totalDurationInSeconds += parseInt(subSection.timeDuration) || 0
          })
        })
        
        // Convert to duration format
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
        
        // Return course with calculated duration
        return {
          ...course.toObject(),
          totalDuration
        }
      })
  
      // Return the instructor's courses with duration
      res.status(200).json({
        success: true,
        data: coursesWithDuration,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
  
  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled || [];
      if (Array.isArray(studentsEnrolled)) {
        for (const studentId of studentsEnrolled) {
          await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
          });
        }
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }

  // Update Course Progress
  exports.updateCourseProgress = async (req, res) => {
    try {
      const { courseId, subsectionId } = req.body
      const userId = req.user.id

      // Validate input
      if (!courseId || !subsectionId) {
        return res.status(400).json({
          success: false,
          message: "Course ID and Subsection ID are required",
        })
      }

      // Check if course exists
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        })
      }

      // Check if subsection exists
      const subsection = await SubSection.findById(subsectionId)
      if (!subsection) {
        return res.status(404).json({
          success: false,
          message: "Subsection not found",
        })
      }

      // Find or create course progress for the user
      let courseProgress = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      })

      if (!courseProgress) {
        courseProgress = await CourseProgress.create({
          courseId: courseId,
          userId: userId,
          completedVideo: [],
        })
      }

      // Check if video is already completed
      if (courseProgress.completedVideo.includes(subsectionId)) {
        return res.status(200).json({
          success: true,
          message: "Video already marked as completed",
        })
      }

      // Add the subsection to completed videos
      courseProgress.completedVideo.push(subsectionId)
      await courseProgress.save()

      return res.status(200).json({
        success: true,
        message: "Course progress updated successfully",
        data: courseProgress,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Failed to update course progress",
        error: error.message,
      })
    }
  }