# 🍽️ Saffron Restaurant

A full-stack restaurant web application built with the MERN stack, containerized with Docker, deployed on Render, and automated with GitHub Actions CI/CD.

🌐 **Live Demo:** [https://saffron-restaurant-1.onrender.com](https://saffron-restaurant-1.onrender.com)

---

## 🚀 Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer + Cloudinary (image upload)
- bcryptjs

### DevOps
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Render (cloud deployment)
- MongoDB Atlas (cloud database)
- Cloudinary (image storage)

---

## ✨ Features

### Customer Side
- Browse menu by category (Starter, Main, Dessert, Drink)
- Add items to cart
- Place orders
- User registration and login
- Submit feedback
- OTP-based delivery verification

### Admin Panel
- Secure admin login
- Add, edit, delete food items
- Upload food images (stored on Cloudinary)
- View and manage orders
- Update order status
- View customer feedback

---

## 🐳 Docker Setup

### Prerequisites
- Docker Desktop installed and running

### Run locally with Docker Compose

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5001 |
| MongoDB | localhost:27017 |

---

## ⚙️ CI/CD Pipeline

Every push to the `main` branch triggers:

1. GitHub Actions workflow runs
2. Render backend auto-deploys
3. Render frontend auto-deploys

```
git push origin main → GitHub Actions → Render Deploy → Live in ~30s
```

---

## 📁 Project Structure

```
saffron-restaurant/
├── client/                  # React frontend
│   ├── public/
│   │   └── _redirects       # Render routing fix
│   ├── src/
│   │   ├── api/             # Axios API calls
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Cart & Auth context
│   │   └── pages/           # Route pages
│   └── Dockerfile
├── server/                  # Node.js backend
│   ├── config/              # DB & Cloudinary config
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Auth middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD
└── docker-compose.yml
```

---

## 🛠️ Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/maheshkumar09104/saffron-restaurant.git
cd saffron-restaurant
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/saffron-restaurant
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the project

```bash
# Backend
cd server
node server.js

# Frontend (new terminal)
cd client
npm run dev
```

---

## 🌍 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Render Static Site | https://saffron-restaurant-1.onrender.com |
| Backend | Render Web Service | https://saffron-restaurant-ccss.onrender.com |
| Database | MongoDB Atlas | Cloud |
| Images | Cloudinary | Cloud |

---

## 🔐 Admin Access

```
URL:      /admin/login
Email:    admin@saffron.com
Password: admin123
```

---

## 📸 Screenshots

### Menu Page
![Menu](screenshots/menu.png)

### Admin Dashboard
![Admin](screenshots/admin.png)

---

## 👨‍💻 Author

**Mahesh Kumar R**
- GitHub: [@maheshkumar09104](https://github.com/maheshkumar09104)
- LinkedIn: [Mahesh Kumar](https://linkedin.com/in/maheshkumar09104)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
