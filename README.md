# 📝To-Do Application
This is the backend of a To-Do Application, built using Node.js and Express with authentication and validation.

##  🚀 Features
- ✅ User authentication (JWT-based)
- ✅ Password hashing with **bcrypt.js**
- ✅ Input validation using **Zod**
- ✅ API routes for managing tasks
- ✅ Built with **TypeScript** for better type safety


---

## 🛠️ Tech Stack

- **Node.js** & **Express** - Backend framework
- **TypeScript** - Type safety
- **JWT (jsonwebtoken)** - Authentication
- **bcrypt.js** - Password hashing
- **Zod** - Request validation

---

## 📌 Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/riazahmedshah/todo-backend.git
cd todo-backend
```
### 2️⃣ Install dependencies
```sh
npm install
npx prisma migrate dev
npx prisma generate
```
### 3️⃣ Set up environment variables
create .env file
```sh
PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
```

### 4️⃣ Run the server
```sh
npm run dev
```
