# Humo Pharm Landing - Backend Integration Setup

Bu hujjat backend va frontend integratsiyasini sozlash bo'yicha batafsil ko'rsatmalarni o'z ichiga oladi.

## 🏗️ Project Structure

```
humo-pharm-landing/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── types/           # TypeScript interfaces
│   │   ├── data/            # Mock data
│   │   ├── app.ts           # Express app
│   │   └── index.ts         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── env.example
│   ├── start.sh
│   └── README.md
├── src/
│   ├── services/            # Frontend API service
│   ├── hooks/               # Custom React hooks
│   └── components/          # React components
└── SETUP.md
```

## 🚀 Backend Setup

### 1. Backend Dependencies o'rnatish

```bash
cd backend
npm install
```

### 2. Environment Variables sozlash

```bash
cp env.example .env
```

`.env` faylini o'z muhitiga moslashtiring:

```env
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Eslatma:** Port 5000 Apple AirTunes tomonidan ishlatiladi, shuning uchun 5001 portini ishlatamiz.

### 3. Backend server ishga tushirish

```bash
# Development mode
npm run dev

# Yoki startup script orqali
chmod +x start.sh
./start.sh
```

Backend server `http://localhost:5001` portida ishga tushadi.

## 🌐 Frontend Integration

### 1. Environment Variables sozlash

Frontend loyiha root papkasida `.env` fayl yarating:

```env
VITE_API_URL=http://localhost:5001/api
```

### 2. Frontend server ishga tushirish

```bash
# Root papkada
npm run dev
```

Frontend server `http://localhost:5173` portida ishga tushadi.

## 🔧 API Endpoints

### Products

- `GET /api/products` - Barcha mahsulotlar
- `GET /api/products/:id` - ID bo'yicha mahsulot
- `GET /api/products/:id/details` - Mahsulot batafsil ma'lumotlari
- `GET /api/products/genera/all` - Barcha genus turlari
- `GET /api/products/categories/all` - Barcha kategoriyalar
- `GET /api/products/search/query?query=searchterm` - Qidirish

### Query Parameters

- `genus` - Genus bo'yicha filtrlash
- `category` - Kategoriya bo'yicha filtrlash
- `search` - Qidiruv so'zi
- `page` - Sahifa raqami
- `limit` - Sahifadagi mahsulotlar soni

## 📱 Frontend Features

### 1. Products Component

- ✅ Backend dan mahsulotlarni olish
- ✅ Genus va kategoriya bo'yicha filtrlash
- ✅ Qidiruv funksionalligi
- ✅ Sahifalash (pagination)
- ✅ Loading states
- ✅ Error handling

### 2. Product Details Component

- ✅ Backend dan mahsulot batafsil ma'lumotlarini olish
- ✅ URL parametrlari orqali mahsulot ID ni olish
- ✅ Loading va error states
- ✅ Responsive design

### 3. API Service

- ✅ TypeScript interfaces
- ✅ Error handling
- ✅ Request/response types
- ✅ Environment variables

### 4. Custom Hooks

- ✅ `useProducts` - Mahsulotlar state management
- ✅ `useProductDetails` - Mahsulot batafsil ma'lumotlari

## 🧪 Testing

### Backend API Testing

```bash
# Health check
curl http://localhost:5001/health

# Get all products
curl http://localhost:5001/api/products

# Get product by ID
curl http://localhost:5001/api/products/1

# Search products
curl "http://localhost:5001/api/products/search/query?query=sistam"

# Filter by genus
curl "http://localhost:5001/api/products?genus=Humo%20Pharm"
```

### Frontend Testing

1. Backend server ishga tushganligini tekshiring
2. Frontend da mahsulotlar ko'rsatilayotganini tekshiring
3. Qidiruv va filtrlash funksionalligini tekshiring
4. Mahsulot batafsil sahifasiga o'tishni tekshiring

## 🐛 Troubleshooting

### Backend Issues

1. **Port already in use**

   ```bash
   # Port 5001 ni tekshiring
   lsof -i :5001

   # Yoki boshqa port ishlatish
   PORT=5002 npm run dev
   ```

2. **Dependencies issues**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript compilation errors**
   ```bash
   npm run build
   ```

### Frontend Issues

1. **API connection failed**

   - Backend server ishga tushganligini tekshiring
   - CORS sozlamalarini tekshiring
   - `.env` fayl to'g'ri sozlanganligini tekshiring

2. **Products not loading**
   - Browser console da xatoliklarni tekshiring
   - Network tab da API so'rovlarini tekshiring

## 🔄 Development Workflow

1. **Backend o'zgarishlari**

   ```bash
   cd backend
   npm run dev  # Hot reload
   ```

2. **Frontend o'zgarishlari**

   ```bash
   # Root papkada
   npm run dev  # Hot reload
   ```

3. **Database o'zgarishlari**
   - `backend/src/data/products.ts` faylini tahrirlang
   - Backend server avtomatik reload bo'ladi

## 🚀 Production Deployment

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
npm run build
# dist/ papkasini hosting ga yuklang
```

## 📝 Notes

- Hozirda mock data ishlatilmoqda
- Kelajakda real database integratsiyasi qo'shiladi
- Authentication va authorization qo'shiladi
- Image upload funksionalligi qo'shiladi
- API rate limiting qo'shiladi

## 🤝 Support

Muammolar yoki savollar bo'lsa:

1. GitHub Issues oching
2. Backend va frontend loglarini tekshiring
3. API response formatini tekshiring
4. Environment variables to'g'ri sozlanganligini tekshiring

---

**Muhim:** Backend va frontend serverlari bir vaqtda ishga tushirilganligiga ishonch hosil qiling!

**Eslatma:** Port 5000 Apple AirTunes tomonidan ishlatiladi, shuning uchun 5001 portini ishlatamiz.
