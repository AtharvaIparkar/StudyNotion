# StudyNotion 🎓💻

A modern **EdTech platform** built with **React.js** and **Node.js**, featuring course creation, student enrollment, and secure payment processing.

🌐 **Live Demo:** [https://studynotion-frontend.vercel.app](https://studynotion-frontend.vercel.app)  
🔗 **Backend API:** [https://studynotion-t9xt.onrender.com](https://studynotion-t9xt.onrender.com)

![StudyNotion Platform](images/mainpage.png)

---

## 🚀 Features

### For Students 👨‍🎓
- **Course Discovery** — Browse and search through diverse course categories
- **Secure Payments** — Integrated Razorpay payment gateway
- **Course Progress Tracking** — Monitor your learning journey
- **Course Reviews & Ratings** — Share feedback and read reviews
- **Responsive Design** — Learn on any device, anywhere

### For Instructors 👨‍🏫
- **Course Creation** — Build comprehensive courses with sections and subsections
- **Content Management** — Upload videos, documents, and multimedia content
- **Analytics Dashboard** — Track course performance and student engagement
- **Student Management** — Monitor enrollments and progress

### Technical Features ⚡
- **Authentication** — JWT-based secure authentication system
- **File Upload** — Cloudinary integration for media storage
- **Real-time Updates** — Live course progress tracking
- **Responsive UI** — Tailwind CSS for modern, mobile-first design
- **State Management** — Redux for efficient state handling

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — Modern UI framework
- **Redux Toolkit** — State management
- **React Router** — Client-side routing
- **Tailwind CSS** — Utility-first CSS framework
- **React Icons** — Icon library
- **Swiper.js** — Touch slider component

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web application framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **JWT** — Authentication tokens
- **Bcrypt** — Password hashing

### Services & Integrations
- **Cloudinary** — Media file storage
- **Razorpay** — Payment processing
- **Nodemailer** — Email notifications
- **Multer** — File upload handling

---

## 📁 Project Structure

```
StudyNotion/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── slices/            # Redux slices
│   └── data/              # Static data files
├── server/                # Backend source code
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middlewares
│   └── utils/            # Utility functions
└── public/               # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Razorpay account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AtharvaIparkar/StudyNotion.git
   cd StudyNotion
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the root directory:
   ```env
   # Frontend (.env)
   REACT_APP_BACKEND_URL=http://localhost:4000/api/v1
   ```

   Create `.env` file in the server directory:
   ```env
   # Backend (server/.env)
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start the development servers**

   **Backend:**
   ```bash
   cd server
   npm start
   ```

   **Frontend:**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)

---

## 📊 Database Schema

The application uses MongoDB with the following main collections:

- **Users** — Student and instructor profiles
- **Courses** — Course information and content
- **Categories** — Course categories
- **Sections** — Course sections
- **SubSections** — Course subsections with media
- **CourseProgress** — Student progress tracking
- **RatingAndReview** — Course reviews and ratings

![Database Schema](images/schema.png)

---

## 🏗️ Architecture

StudyNotion follows a **client-server architecture** with:

- **Frontend** — React.js SPA with Redux state management
- **Backend** — RESTful API built with Express.js
- **Database** — MongoDB with Mongoose ODM
- **File Storage** — Cloudinary for media files
- **Payments** — Razorpay integration

![Architecture Diagram](images/architecture.png)

---

## 🔧 API Endpoints

### Authentication
- `POST /auth/signUp` — User registration
- `POST /auth/login` — User login
- `POST /auth/sendOTP` — OTP verification
- `POST /auth/reset-password` — Password reset

### Courses
- `GET /course/getAllCourses` — Get all courses
- `POST /course/createCourse` — Create new course
- `GET /course/getCourseDetails` — Get course details
- `PUT /course/editCourse` — Edit course

### Payments
- `POST /payment/capturePayment` — Process payment
- `POST /payment/verifyPayment` — Verify payment
- `GET /payment/getRazorpayKey` — Get payment key

### Profile
- `GET /profile/getUserDetails` — Get user profile
- `PUT /profile/updateProfile` — Update profile
- `GET /profile/getEnrolledCourses` — Get enrolled courses

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.com/api/v1
   ```
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy as a web service

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Atharva Iparkar**
- GitHub: [@AtharvaIparkar](https://github.com/AtharvaIparkar)
- LinkedIn: [Atharva Iparkar](https://linkedin.com/in/atharva-iparkar)

---

## 🙏 Acknowledgments

- **React.js** — For the amazing frontend framework
- **Node.js** — For the powerful backend runtime
- **MongoDB** — For the flexible database solution
- **Tailwind CSS** — For the beautiful utility-first CSS framework
- **Vercel** — For seamless frontend deployment
- **Render** — For reliable backend hosting

---

**Made with ❤️ by Atharva Iparkar**



