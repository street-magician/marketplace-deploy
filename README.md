Final project for the course

Marketplace 2.0

A full-stack online marketplace application where users can register, log in, create, view, edit, and delete listings. Built with a react frontend, node.js backend, postgreSQL database, and deployed on Railway.
Live Demo:
https://marketplace-deploy-production.up.railway.app

Features

    - User authentication (JWT-based)
    - Create, view, edit, and delete product listings
    - Image upload for listings
    - Role-based access for listing management
    - Responsive UI using vite + react
    - RESTful API using aode.js and express
    - PostgreSQL database with Prisma ORM


Running Locally

    Clone the repository:

git clone https://github.com/street-magician/marketplace-deploy.git

Set up environment variables:

    In apps/backend/.env:

DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret

In apps/frontend/.env:

    VITE_API_URL=http://localhost:8080

Install dependencies:

cd apps/backend
npm install

cd ../frontend
npm install

Generate Prisma client and push schema:

cd apps/backend
npx prisma generate --schema=../../packages/db/prisma/schema.prisma
npx prisma db push --schema=../../packages/db/prisma/schema.prisma

Run both frontend and backend:

In apps/backend:

npm start

In apps/frontend:

npm run dev

Open your browser at http://localhost:5173

Deployment

    - Frontend and backend are deployed on Railway under separate services
    - Environment variables are configured on Railway for both services
    - PostgreSQL is managed by Railway and connected via DATABASE_URL

Documentation

    - Project progress is tracked using GitHub issues
    - Deployment status is visible on Railway

Summary

This project demonstrates a complete implementation of a modern full-stack CRUD application with authentication and file handling.
