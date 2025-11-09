"# LinkedIn-Clone" 

# 💼 LinkedIn Clone

A full-stack **LinkedIn Clone** built with the **MERN (MongoDB, Express.js, React.js, Node.js)** stack.  
This project replicates essential LinkedIn functionalities including **authentication**, **post creation**, **likes**, and **comments**, with full **frontend-backend integration** and **cloud deployment**.

---

##  Tech Stack

**Frontend:** React.js, Axios, React Hooks, Context API  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT (JSON Web Tokens)  
**Styling:** CSS  
**Deployment:** Render

## 🛠️ Installation and Setup

### Clone the Repository

gitclone url:https://github.com/saipavanAdari/LinkedIn-Clone.git


------

##  Folder Structure

LinkedIn-Clone/
│
├── frontend/ # React Frontend
│ ├── src/
│ │ ├── components/ # UI Components (Navbar, Feed, PostCard, etc.)
│ │ ├── pages/ # Auth Pages, Feed Page
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
├── backend/ # Node.js + Express Backend
│ ├── routes/ # authRoutes.js, postRoutes.js
│ ├── models/ # User.js, Post.js
│ ├── server.js
│ ├── .env (not pushed to repo)
│ └── package.json
│
└── README.md


---

## ⚙️ Environment Variables
Create a `.env` file inside the `backend/` directory:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

```
## RUN Project
 
Open two terminals

For frontend 
>cd frontend
>npm start

For Backend
>cd backend
>npm install express Mongoose bcryptjs CORS
>npm start 

{- Express.js
- MongoDB (Mongoose)
- dotenv
- bcryptjs / JWT Authentication
- CORS}--examples library used



## examples credentials

email:sai@gmail.com
password: 123456.


##  Features Implemented

###  Authentication
- User **Sign Up** and **Login** using JWT.
- Passwords are securely hashed with bcrypt.

###  Posts
- Create, Read, and Delete posts.
- Upload text and image-based posts.

###  Likes &  Comments
- Like/unlike posts.
- Add and view comments dynamically.

###  Real-time UI updates
- React state updates instantly after every action.

###  MongoDB Integration
- Stores users, posts, likes, and comments efficiently.

---

## Live url

https://linkedin-clone-d2f7.onrender.com/


