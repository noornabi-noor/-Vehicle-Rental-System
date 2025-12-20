# 🚗 Vehicle Rental System (Backend API)

## 🎯 Project Overview

The **Vehicle Rental System** is a backend REST API built using **Node.js, TypeScript, Express, and PostgreSQL**.  
It provides a complete solution for managing vehicle rentals with secure authentication and role-based access control.

### Features
- 🚘 Vehicle inventory management with availability tracking
- 👤 User management with Admin and Customer roles
- 📅 Booking system with rental duration and cost calculation
- 🔐 Secure authentication using JWT
- 🛡️ Role-based authorization

---

## 🛠️ Technology Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)

---

## 📁 Project Structure

```text
src/
├── config/
│   ├── db.ts
│   └── index.ts
│
├── middleware/
│   └── auth.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   └── auth.services.ts
│   │
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.routes.ts
│   │   └── users.services.ts
│   │
│   ├── vehicles/
│   │   ├── vehicles.controller.ts
│   │   ├── vehicles.routes.ts
│   │   └── vehicles.services.ts
│   │
│   └── bookings/
│       ├── bookings.controller.ts
│       ├── bookings.routes.ts
│       └── bookings.services.ts
│
├── app.ts
└── server.ts

```

✔ Modular  
✔ Feature-based  
✔ Clean separation of concerns  

---

## 📊 Database Schema

### Users Table

| Field | Description |
|------|------------|
| id | Auto-generated |
| name | Required |
| email | Required, unique, lowercase |
| password | Required, min 6 characters |
| phone | Required |
| role | `admin` or `customer` |

---

### Vehicles Table

| Field | Description |
|------|------------|
| id | Auto-generated |
| vehicle_name | Required |
| type | `car`, `bike`, `van`, `SUV` |
| registration_number | Required, unique |
| daily_rent_price | Required, positive |
| availability_status | `available` or `booked` |

---

### Bookings Table

| Field | Description |
|------|------------|
| id | Auto-generated |
| customer_id | References users(id) |
| vehicle_id | References vehicles(id) |
| rent_start_date | Required |
| rent_end_date | Must be after start date |
| total_price | Required, positive |
| status | `active`, `cancelled`, `returned` |

---

## 🔐 Authentication & Authorization

### User Roles

- **Admin**
  - Manage vehicles, users, and all bookings
- **Customer**
  - View vehicles
  - Create and manage own bookings

### Authentication Flow

1. Passwords are hashed using **bcrypt**
2. Login via `/api/v1/auth/signin`
3. Server returns a **JWT token**
4. Protected routes require:
5. Token and role are validated via middleware

---

## 🌐 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Access | Description |
|------|---------|--------|-------------|
| POST | `/api/v1/auth/signup` | Public | Register new user |
| POST | `/api/v1/auth/signin` | Public | Login and receive JWT |

---

### 🚘 Vehicles

| Method | Endpoint | Access | Description |
|------|---------|--------|-------------|
| POST | `/api/v1/vehicles` | Admin | Add new vehicle |
| GET | `/api/v1/vehicles` | Public | View all vehicles |
| GET | `/api/v1/vehicles/:vehicleId` | Public | View vehicle details |
| PUT | `/api/v1/vehicles/:vehicleId` | Admin | Update vehicle |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin | Delete vehicle (if no active bookings exist) |

---

### 👤 Users

| Method | Endpoint | Access | Description |
|------|---------|--------|-------------|
| GET | `/api/v1/users` | Admin | View all users |
| PUT | `/api/v1/users/:userId` | Admin / Own | Admin updates any user, Customer updates own profile |
| DELETE | `/api/v1/users/:userId` | Admin | Delete user (if no active bookings exist) |

---

### 📅 Bookings

| Method | Endpoint | Access | Description |
|------|---------|--------|-------------|
| POST | `/api/v1/bookings` | Admin / Customer | Create booking |
| GET | `/api/v1/bookings` | Role-based | Admin: all bookings, Customer: own bookings |
| PUT | `/api/v1/bookings/:bookingId` | Role-based | Customer: cancel booking, Admin: mark as returned |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental
JWT_SECRET=your_jwt_secret

```
## ▶️ Run the Project
- npm install
- npm run dev

Server will run on:

http://localhost:5000

---
## 🚀 Deployment

The Vehicle Rental System backend API has been successfully deployed on **Vercel**.

🔗 **Live API Base URL:**  
https://vehical-rental-system-alpha.vercel.app/

### Example Usage
```http
GET https://vehical-rental-system-alpha.vercel.app/api/v1/vehicles
```
