# Scalable REST API & Frontend

This project is a full-stack application demonstrating Authentication, Role-Based Access Control (RBAC), and CRUD operations using Node.js, Express, MongoDB, and React.

## Features
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT with Password Hashing
- **RBAC**: Middleware for Admin/User roles
- **Security**: Helmet, CORS, Input Validation
- **Frontend**: React (Vite), Context API, Axios

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB (Running locally or update .env)

### Backend Setup
1. Navigate to `/backend`
2. Run `npm install`
3. Create `.env` file (see structure below)
4. Run `npm start` (Server runs on port 5000)

**Backend .env**:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/primetrade_assignment
JWT_SECRET=supersecretkey123
```

### Frontend Setup
1. Navigate to `/frontend`
2. Run `npm install`
3. Run `npm run dev`
4. Access at `http://localhost:5173`

## API Documentation
Swagger UI is available at `http://localhost:5000/api-docs` when server is running.

## Scalability Note
To ensure this application scales effectively for high traffic, the following strategies are recommended:

1.  **Microservices Architecture**: 
    -   Currently, the User and Product logic reside in a unified backend. Splitting them into separate microservices (e.g., `auth-service`, `product-service`) allows independent scaling based on load.
2.  **Database Scaling**:
    -   **Sharding**: Distribute data across multiple machines.
    -   **Replication**: Use replica sets for high availability and read-scaling.
3.  **Caching**:
    -   Implement **Redis** to cache frequently accessed data (e.g., Product Lists) to reduce database hits.
4.  **Load Balancing**:
    -   Deploy multiple instances of the backend behind a Load Balancer (Nginx, AWS ALB) to distribute incoming traffic.
5.  **Containerization**:
    -   Use **Docker** and **Kubernetes** to orchestrate containers, enabling auto-scaling key services during peak usage.

## Deployment
-   **Frontend**: Can be deployed to Vercel, Netlify, or AWS S3+CloudFront.
-   **Backend**: Suitable for Render.com, Heroku, or AWS EC2/ECS.
-   **Database**: MongoDB Atlas requires no infrastructure management and scales automatically.
