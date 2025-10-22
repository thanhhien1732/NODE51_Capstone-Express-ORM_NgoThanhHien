# 📸 Capstone Express ORM (Pinterest)

A full-featured RESTful API built with **Node.js**, **Express**, and **Prisma ORM**, simulating Pinterest's backend system — including image upload, save, comment, and authentication features.

---

## 🚀 Tech Stack

| Category | Technologies |
|-----------|---------------|
| Backend Framework | **ExpressJS** |
| ORM | **Prisma ORM** |
| Database | **MySQL** (via Docker) |
| Authentication | **JWT (Access & Refresh Token)** |
| Image Storage | **Cloudinary** |
| Middleware | **Multer**, **Custom Protect Middleware** |
| API Docs | **Swagger UI** |
| Mail | **Nodemailer** |
| Hashing | **bcrypt** |

---

## 🧩 Features

✅ User registration and authentication  
✅ Upload avatar & image to Cloudinary  
✅ Comment and Save (like Pinterest pins)  
✅ JWT token verification middleware  
✅ Role-based access ready (via checkPermission middleware)  
✅ Swagger UI for API documentation  
✅ Dockerized MySQL environment  
✅ Follows MVC structure + clean service layer  

---

## 🗂️ Folder Structure

```
src/
 ├── common/
 │   ├── app-error/
 │   ├── cloudinary/
 │   ├── constant/
 │   ├── helpers/
 │   ├── middlewares/
 │   ├── multer/
 │   └── prisma/
 ├── controllers/
 ├── routers/
 ├── services/
 ├── swagger/
 ├── server.js
 └── .env
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL="mysql://root:123456@localhost:3309/db_capstone_express"
ACCESS_TOKEN_SECRET="your_access_secret"
REFRESH_TOKEN_SECRET="your_refresh_secret"
ACCESS_TOKEN_EXPIRES_IN="30s"
REFRESH_TOKEN_EXPIRES_IN="1d"
CLOUDINARY_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

---

## 🐳 Docker Setup (MySQL)

```bash
docker run -d --name capstone-express-mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3309:3306 mysql
docker ps
docker exec -it capstone-express-mysql bash
```

---

## 🔧 Prisma Commands

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
```

---

## 🚀 Run Project

```bash
npm run dev
# Default server URL
http://localhost:3060/api
```

---

## 🧭 API Documentation (Swagger)

http://localhost:3060/api/docs

---

## 📸 API Groups Overview (24 APIs)

### 🔐 Auth (3)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login and get tokens |
| POST | `/auth/refresh-token` | Refresh access token |

### 👤 User (5)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/user/avatar-cloud` | Upload avatar to Cloudinary |
| GET | `/user` | Get all users |
| GET | `/user/:id` | Get user by ID |
| PUT | `/user/:id` | Update user info |
| DELETE | `/user/:id` | Delete user |

### 🖼️ Image (6)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/image` | Get all images (infinite scroll) |
| GET | `/image/:id` | Get image detail with comments |
| GET | `/image/search?ten_hinh=` | Search image by name |
| GET | `/image/user/:nguoi_dung_id` | Get all images of user |
| POST | `/image` | Upload image to Cloudinary |
| DELETE | `/image/:id` | Delete image (DB + Cloudinary) |

### 💬 Comment (5)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/comment/:hinh_id` | Get comments of image |
| POST | `/comment` | Add new comment |
| PUT | `/comment/:id` | Update comment content |
| DELETE | `/comment/:id` | Delete comment |
| GET | `/comment/user/:nguoi_dung_id` | Get all comments by user |

### 📌 Save (5)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/save/:hinh_id` | Save image to account |
| DELETE | `/save/:hinh_id` | Unsave image |
| GET | `/save/user/:nguoi_dung_id` | Get all saved images by user |
| GET | `/save/image/:hinh_id` | Get users who saved an image |
| GET | `/save/check/:hinh_id` | Check if user saved the image |

---

## 🧱 Author

**👤 Thanh Hiền Ngô**  
Technical Artist / Backend Developer  
📧 [thanhhien1732@gmail.com](mailto:thanhhien1732@gmail.com)

---

## 🧭 License
Educational project for CyberSoft Academy Capstone.  
Feel free to fork and enhance it for learning.
