#  Project Tracker

A modular **Project & Task Management REST API** built with **TypeScript**, following **Clean Architecture**, **Object-Oriented Programming (OOP)**, and **SOLID Principles**.

The application provides secure authentication and enables users to manage projects and tasks through a scalable layered architecture.

---

##  Features

###  Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing with bcrypt

###  Project Management

* Create Project
* View All Projects
* View Project Details
* Update Project
* Delete Project

###  Task Management

* Create Tasks
* View Tasks by Project
* Update Tasks
* Delete Tasks
* Manage Task Status
* Set Due Dates

---

#  Tech Stack

## Backend

* TypeScript
* Node.js
* Express.js
* Prisma ORM
* MySQL
* JWT Authentication
* Zod Validation
* bcrypt
* Clean Architecture

---

#  Project Structure

```text
backend/
└── src/
    ├── application/
    ├── domain/
    ├── infrastructure/
    ├── presentation/
    ├── shared/
    └── main.ts
```

---

#  Clean Architecture

```
                    HTTP Request
                         │
                         ▼
                 Presentation Layer
               (Routes, Controllers,
             Middlewares, Validation)
                         │
                         ▼
                Application Layer
                  (Use Cases)
                         │
                         ▼
                   Domain Layer
          (Entities, Interfaces,
            Business Rules)
                         ▲
                         │
              Infrastructure Layer
      (Prisma, JWT, bcrypt, Database)
```

---

#  Layer Responsibilities

##  Domain

The Domain layer contains the core business logic and remains independent of external frameworks.

Includes:

* Entities
* Repository Interfaces
* Business Rules
* Domain Contracts

---

##  Application

The Application layer contains all use cases that coordinate business operations.

Examples:

* Register User
* Login User
* Create Project
* Update Project
* Create Task
* Update Task

---

##  Infrastructure

Responsible for implementing external services and data persistence.

Includes:

* Prisma Repositories
* MySQL Database
* JWT Service
* bcrypt Service

---

##  Presentation

Handles the API layer and communication with clients.

Includes:

* Express Routes
* Controllers
* Request Validation
* Middlewares
* Error Handling
* Response Utilities

---

##  Shared

Contains reusable utilities and common helper functions shared across the application.

---

#  Feature Modules

The project is organized into independent feature modules.

```
Auth
├── Register
├── Login
└── JWT Authentication

Project
├── Create
├── Read
├── Update
└── Delete

Task
├── Create
├── Read
├── Update
├── Delete
├── Status Management
└── Due Date Management
```

---

#  Design Principles

This project demonstrates:

*  Clean Architecture
*  SOLID Principles
*  Object-Oriented Programming
*  Dependency Injection
*  Repository Pattern
*  Service Layer Abstraction
*  Separation of Concerns
*  Composition over Inheritance

---

#  Authentication Flow

```
User
   │
   ▼
Login/Register
   │
   ▼
Validate Request
   │
   ▼
Generate JWT
   │
   ▼
Protected Routes
```

---

#  API Modules

* Authentication
* Projects
* Tasks

---

##  Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file and configure your database connection and JWT secret.

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Apply Database Migrations

```bash
npx prisma migrate dev
```

### 5. Start the Development Server

```bash
npx tsx src/main.ts
```

If the server starts successfully (e.g., `Server listening on port 3000`), open Prisma Studio to view and manage the database.

### 6. Open Prisma Studio

```bash
npx prisma studio
```

Prisma Studio provides a graphical interface to inspect and manage your application's database records.


#  Author

**Adithyan K S**

Built as part of a TypeScript learning project to practice **Clean Architecture**, **OOP**, **SOLID Principles**, and scalable backend development.
