const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require('dotenv').config();

// sendOTP
exports.sendOTP = async(req, res) => {
    try {
        // fetch email from request body
        const {email} = req.body;

        // check if user already exists
        const checkUserPresent = await User.findOne({email});

        // if user already exists, then return a response
        if(checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        }

        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated : ", otp);

        // check unique otp or not
        const result = await OTP.findOne({otp: otp});

        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        // create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return response successful
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        })  

    } catch(error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// signup
exports.signUp = async(req, res) => {
    try {
        // data fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        // validate krlo
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All feilds are required",
            })
        }
        // 2 password match krlo
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword value does not match, pleasw try again",
            })
        }

        // check user already exists or not 
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            })
        }

        // find most recent OTP stoored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        // validate OTP
        if(recentOtp.length === 0) {
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            })
        } else if(otp !== recentOtp[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // entry create in DB

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}_${lastName}`,
        })

        // return res
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        })
    } catch(error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again!",
        })
    }
}

// login
exports.login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        // Check if user exists
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup again",
            });
        }

        // Compare entered password with stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        // Generate JWT token
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        user.token = token;
        user.password = undefined; // Don't expose password

        // Set cookie options
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
            secure: true,      
            sameSite: "None",
        };

        // Send cookie + response
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Logged in successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Login failure, please try again",
        });
    }
};


// changePassword
exports.changePassword = async(req, res) => {
    try {
        // get data from req body
        const {oldPassword, newPassword, confirmPassword} = req.body;
        // get userId from token
        const userId = req.user.id;
        
        // validation
        if(confirmPassword !== newPassword) {
            return res.status(401).json({
                success: false,
                message: "Both the passwords should match",
            })
        }
        
        // find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        
        // verify old password
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            })
        }
        
        // hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // update password in DB
        await User.findByIdAndUpdate(
            userId,
            {password: hashedPassword},
            {new: true},
        )
        
        // send mail - Password updated
        try {
            await mailSender(user.email,
                            "Password Changed Successfully",
                            `Password updated successfully`,
            );
        } catch (emailError) {
            // Don't fail the password change if email fails
        }
        
        // return response
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        })
        
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message || "Password change error",
        })
    }

}