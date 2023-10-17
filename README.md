# 🎓 Student Data Management System

This project demonstrates the integration between a React frontend, Express backend, and MongoDB database. It allows you to **view**, **add**, **update**, and **delete** student data with two fields: **name** and **age**. You can also observe **live changes** in the application when data is modified directly from **MongoDB Compass**.

## Prerequisites

Make sure you have the following software installed on your system:

- **Node.js and npm:** [https://nodejs.org/](https://nodejs.org/)
- **MongoDB:** [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **MongoDB Compass:** [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

## Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd student-data-management-system

# Install dependencies for frontend
cd frontend
npm install

# Install dependencies for backend
cd ../backend
npm install

# Set up MongoDB:
# - Start your MongoDB server.
# - Open MongoDB Compass and create a new database named `studentdb`.

# Configure the backend:
# - Rename .env.example to .env in the backend folder.
# - Update the MongoDB connection URL in the .env file:
#   MONGODB_URI=mongodb://localhost:27017/studentdb

# Start the backend server:
cd backend
npm start
# The backend server will run at http://localhost:3001.

# Start the frontend development server:
cd ../frontend
npm start
# The React development server will run at http://localhost:3000.

# Open your browser and go to http://localhost:3000 to view the application.
