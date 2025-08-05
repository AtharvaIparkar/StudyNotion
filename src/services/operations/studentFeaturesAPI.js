import { toast } from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API, GET_RAZORPAY_KEY_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        // Get Razorpay key from server
        const keyResponse = await apiConnector("GET", GET_RAZORPAY_KEY_API, null, {
            Authorization: `Bearer ${token}`,
        })
        
        if(!keyResponse.data.success) {
            throw new Error("Could not get Razorpay key");
        }
        
        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
            {courses},
            {
                Authorization: `Bearer ${token}`,
            })

            if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
            }
            console.log("PRINTING orderResponse", orderResponse);
        
            const options = {
            key: keyResponse.data.key,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        
        //load the script first
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }
        
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

        
        // Mock payment - bypasses Razorpay but keeps all functionality
        // console.log("Using mock payment for testing...");
        
        // // Create mock payment response that matches Razorpay format
        // const mockPaymentResponse = {
        //     razorpay_order_id: orderResponse.data.data.id,
        //     razorpay_payment_id: "pay_test_" + Date.now(),
        //     razorpay_signature: "mock_signature_" + Date.now()
        // };
        
        // // Show success message
        // toast.success("Payment successful! (Mock payment)");
        
        // // Small delay to show the success message
        // setTimeout(() => {
        //     // Call all existing functionality - enrollment, email, verification
        //     sendPaymentSuccessEmail(mockPaymentResponse, orderResponse.data.data.amount, token);
        //     verifyPayment({...mockPaymentResponse, courses}, token, navigate, dispatch);
        // }, 1000);

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}