# 🚀 Milestone 4 Project – Backend API

This project is part of the RevoU Full Stack Software Engineering program, focused on building a scalable backend system using modern technologies.

## 📌 Overview

This application is a backend API service that handles core business logic such as user management, account management, and transaction processing.

The system is designed using clean architecture principles, separating concerns between controller, service, and repository layers.

Click [here](https://revobank.onrender.com/) to access the link for deployed application

---

## ⚙️ Features

- ✅ User management (CRUD)
- ✅ Account management
- ✅ Transaction handling
- ✅ Relational data handling (User → Account → Transaction)
- ✅ Error handling with standardized HTTP responses
- ✅ RESTful API design
- ✅ Database integration using ORM

---

## 🛠️ Tech Stack

- **Framework:** NestJS  
- **Language:** TypeScript  
- **ORM:** Prisma  
- **Authentication & Authorization:** JWT  
- **Password Hashing:** bcrypt  
- **Database:** PostgreSQL  
- **Package Manager:** pnpm  

---

## 📂 Project Structure
src/  
├── modules/  
│ ├── users/  
│ ├── accounts/  
│ ├── transactions/  
├── common/  
├── prisma/  
├── main.ts  

### Architecture

- **Controller** → Handle HTTP request/response  
- **Service** → Business logic  
- **Repository** → Database access (Prisma)  

---

## 🧪 API Endpoints

### Auth
- `POST /auth/register` → Register new user
- `POST /auth/login` → Login with created / existing user

### Users
- `GET /users/profile` → Get logged in user profile
- `PATCH /users` → Update user's email / user's name

### Accounts
- `POST /accounts` → Create account
- `GET /accounts` → Get logged in user's account
- `PATCH /accounts` → Update user's account **[admin only]**
- `DELETE /accounts/:account_number` → Delete account with account number as param

### Transactions
- `POST /transactions/deposit` → Deposit money to an account
- `GET /transactions/:account_number` → Get user's account transaction **[single account]**

---

## 🧩 Database Schema

- **User**
  - id
  - name
  - email
  - password
  - role

- **Account**
  - account_number
  - balance
  - lower_limit
  - upper_limit
  - user_id

- **Transaction**
  - id
  - transaction_type
  - account_number
  - amount
  - transfer_to
  - transaction_date_time

---

## 🚀 Getting Started

### 1. Clone repository
```bash
git clone https://github.com/Revou-FSSE-Oct25/milestone-4-amaierr.git
cd milestone-4-amaierr
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Setup environment variables
Create .env file:
```bash
DATABASE_URL="your_database_url"
```

### 4. Run Prisma migration
```bash
npx prisma migrate dev
```

### 5. Generate Prisma client
```bash
npx prisma generate
```

### 6. Run development server
```bash
pnpm run start:dev
```

---

## 📮 Testing API

### You can test endpoints using:

- Postman
- Thunder Client
- curl

---

## 🔮 Future Improvements
1. Unit & integration testing
2. Swagger API documentation