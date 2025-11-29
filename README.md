# Note App - Progressive Web Application

Một ứng dụng web ghi chú hiện đại được xây dựng với React, Node.js, Express, và MongoDB. Ứng dụng cung cấp giao diện người dùng mượt mà với các hiệu ứng UI/UX tuyệt vời.

## ✨ Tính Năng

- 📝 **Tạo, chỉnh sửa, xóa ghi chú** - Quản lý ghi chú một cách dễ dàng
- 📌 **Ghim ghi chú** - Ghim các ghi chú quan trọng lên trên cùng
- 🏷️ **Danh mục và Tags** - Phân loại ghi chú theo danh mục và thẻ
- 🔍 **Tìm kiếm** - Tìm kiếm ghi chú nhanh chóng theo tiêu đề hoặc nội dung
- 🎨 **Tùy chỉnh màu sắc** - Chọn màu sắc cho từng ghi chú
- 🎬 **Hiệu ứng Smooth** - Các hiệu ứng cuộn trang và chuyển tiếp mượt mà
- 🔐 **Xác thực Admin** - Đăng nhập bảo mật với JWT
- 📱 **Responsive Design** - Hoạt động tốt trên tất cả các thiết bị
- 🌐 **MongoDB Cloud** - Lưu trữ dữ liệu trên MongoDB Atlas

## 📋 Yêu Cầu

- Node.js (v14 hoặc cao hơn)
- npm (v6 hoặc cao hơn)
- MongoDB Atlas Account (hoặc MongoDB server cục bộ)

## 🚀 Cài Đặt

### Backend Setup

1. Vào thư mục backend:
```bash
cd backend
```

2. Cài đặt các dependencies:
```bash
npm install
```

4. Chạy server:
```bash
npm start
```

Hoặc chạy với Nodemon (auto-reload):
```bash
npm run dev
```

Server sẽ chạy trên `http://localhost:5000`

### Frontend Setup

1. Vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Chạy ứng dụng React:
```bash
npm start
```

Ứng dụng sẽ mở tại `http://localhost:3000`

## 🔐 Đăng Nhập

**Tài khoản Demo:**
- Username: `HuyPhan`
- Password: `Huyphan19082008`

## 📁 Cấu Trúc Dự Án

```
noteapp/
├── backend/
│   ├── controllers/       # Xử lý logic nghiệp vụ
│   ├── models/           # Schema MongoDB
│   ├── routes/           # Định nghĩa API routes
│   ├── middleware/       # Middleware xác thực
│   ├── server.js         # File server chính
│   ├── package.json      # Dependencies backend
│   └── .env              # Biến môi trường
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Trang chính (Login, Dashboard)
│   │   ├── services/     # API calls
│   │   ├── context/      # Auth context
│   │   ├── App.js        # Component chính
│   │   └── index.js      # Entry point
│   ├── public/           # Static files
│   ├── package.json      # Dependencies frontend
│   └── .gitignore
│
└── README.md
```

## 🎨 Công Nghệ Sử Dụng

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin requests

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Icons** - Icons

## 🎯 API Endpoints

### Admin Routes
- `POST /api/admin/login` - Đăng nhập
- `GET /api/admin/profile` - Lấy thông tin admin (Protected)

### Note Routes
- `GET /api/notes` - Lấy tất cả ghi chú (Protected)
- `POST /api/notes` - Tạo ghi chú mới (Protected)
- `GET /api/notes/:id` - Lấy ghi chú theo ID (Protected)
- `PUT /api/notes/:id` - Cập nhật ghi chú (Protected)
- `DELETE /api/notes/:id` - Xóa ghi chú (Protected)
- `PATCH /api/notes/:id/pin` - Ghim/Bỏ ghim ghi chú (Protected)

## 🎬 Hiệu Ứng & Animations

- ✨ Fade-in animations khi tải ghi chú
- 🎨 Smooth transitions giữa các trang
- 📱 Scroll effects mượt mà
- 🎭 Hover effects trên các button
- 🔄 Loading animations

## 🔒 Bảo Mật

- JWT-based authentication
- Password hashing với bcryptjs
- Protected routes
- CORS configuration

## 📱 Responsive Design

Ứng dụng hoạt động tốt trên:
- 📱 Mobile phones
- 💻 Tablets
- 🖥️ Desktop screens

## 🐛 Troubleshooting

### MongoDB Connection Error
- Kiểm tra connection string có đúng không
- Đảm bảo IP whitelist được thêm vào MongoDB Atlas

### CORS Error
- Đảm bảo backend đang chạy trên port 5000
- Kiểm tra CORS configuration trong server.js

### Token Error
- Xóa localStorage và đăng nhập lại
- Kiểm tra JWT_SECRET được set đúng

## 📝 License

MIT License

## 👨‍💻 Author

Huy Phan

## 📞 Support

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Backend đang chạy trên port 5000
2. MongoDB connection string đúng
3. Environment variables được set đúng
4. Dependencies được cài đặt đủ
