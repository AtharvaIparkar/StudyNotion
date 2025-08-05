const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const {convertSecondsToDuration} = require('../utils/secToDuration');

exports.updateProfile = async (req, res) => {
    try {
        // get data
        const {firstName, lastName, dateOfBirth="", about="", contactNumber, gender} = req.body;
        // get userId
        const id = req.user.id;
        // validation
        if(!contactNumber || !gender || !id || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        
        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();
        
        // update user basic details
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                firstName: firstName,
                lastName: lastName,
            },
            { new: true }
        ).populate("additionalDetails");
        
        // return response
        return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                updatedUserDetails: updatedUser,
            });
    } catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
};

// delete account 
// Explore -> how can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
    try {
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        // delete user
        await User.findByIdAndDelete({_id: id});
        // TODO: HW unenroll user from all enrolled courses
        // return response
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "User can't be deleted",
        })
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // get id
        const id = req.user.id;
        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        // return response
        return res.status(200).json({
                success: true,
                message: "User data fetched successfully",
                userDetails,
            });
    } catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      // Set total duration after calculating all sections
      userDetails.courses[i].totalDuration = convertSecondsToDuration(
        totalDurationInSeconds
      )
      let courseProgressCount = await CourseProgress.findOne({
        courseId: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideo.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  try {
    console.log("Instructor Dashboard called for user:", req.user.id)
    
    const courseDetails = await Course.find({ instructor: req.user.id })
    console.log("Found courses:", courseDetails.length)

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled?.length || 0
      const totalAmountGenerated = totalStudentsEnrolled * (course.price || 0)

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        price: course.price || 0,
        studentsEnrolled: course.studentsEnrolled || [],
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    console.log("Sending response with", courseData.length, "courses")
    res.status(200).json({
      success: true,
      data: courseData
    })
  } catch (error) {
    console.error("Instructor Dashboard Error:", error)
    res.status(500).json({ 
      success: false,
      message: "Server Error in instructor dashboard",
      error: error.message 
    })
  }
}