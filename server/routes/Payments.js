// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature, sendPaymentSuccessEmail, verifyPayment, getRazorpayKey } = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

router.get("/getRazorpayKey", auth, getRazorpayKey)
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router