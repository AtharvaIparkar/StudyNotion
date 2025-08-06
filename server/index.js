const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

// database connect
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "http://localhost:3000", 
            "https://localhost:3000",
            "https://studynotion-frontend.vercel.app",
            "https://studynotion.vercel.app",
            "https://study-notion-sages.vercel.app/",
            process.env.FRONTEND_URL
        ].filter(Boolean),
        credentials: true,
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

// cloudinary connect
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running....",
    })
})

// test route for debugging
app.get("/api/v1/test", (req, res) => {
    return res.json({
        success: true,
        message: "Test endpoint working",
        timestamp: new Date().toISOString()
    })
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});