# **Computer Store Project README**

## **Overview**
This project is a full-stack application for managing a computer store. It includes user authentication, product management, cart functionality, and order management. It uses MongoDB for the database, Node.js with Express for the backend, and React for the frontend.

---

## **Prerequisites**
1. **Docker Installed**: Ensure Docker is installed and running.
2. **Node.js Installed**: Verify that Node.js (version 16 or above) and npm are installed.
3. **MongoDB Docker Image**: MongoDB should already be set up as a Docker container.

---

## **Setup Instructions**

### **1. Start MongoDB in Docker**
- Ensure a MongoDB Docker container is running. 
- Use the following command if the container is not running:
  ```bash
  docker run -d --name mongodb-container -p 27017:27017 mongo
### 2.Import Seed Data
  node seed.js
### 3. Install Dependencies
Frontend
  cd computerstore
  npm install
Backend
  cd ..
  npm install
### 4. Build the Frontend
  cd computerstore
  npm run buld
### 5. start server
  cd ..
  node server.js
