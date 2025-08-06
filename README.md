# StudyNotion 🎓💻

A modern **EdTech platform** built with **React.js** and **Node.js**, featuring course creation, student enrollment, and secure payment processing.

🌐 Live site: [https://study-notion-sages.vercel.app/](https://study-notion-sages.vercel.app/)

---

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

4. **Start the development servers**

   **Backend:**
   ```bash
   cd server
   npm start
   ```

   **Frontend:**
   ```bash
   npm start
   ```

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

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy as a web service

---

**Made with ❤️ by Atharva Iparkar**
