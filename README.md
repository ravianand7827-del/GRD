# GRD Travels - Premium Travel Booking Platform

> **Safe Journey, Our Priority**

A full-stack production-ready travel booking website for GRD Travels, Delhi.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + Google OAuth + OTP |
| Payments | Razorpay + Stripe |
| Storage | Cloudinary |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm v9+

### 1. Clone & Setup

```bash
git clone https://github.com/yourusername/grd-travels.git
cd grd-travels
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run seed      # Seed sample data
npm run dev       # Start on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev       # Start on http://localhost:3000
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/grd_travels
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=sk_test_...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_WHATSAPP_NUMBER=918595995437
```

---

## Admin Access

After running `npm run seed`:

```
URL:      http://localhost:3000/admin/dashboard
Email:    admin@grdtravels.com
Password: Admin@123
```

---

## Project Structure

```
GRD/
├── backend/
│   └── src/
│       ├── config/        # DB, Cloudinary config
│       ├── controllers/   # Route handlers
│       ├── middleware/    # Auth, upload middleware
│       ├── models/        # MongoDB schemas
│       ├── routes/        # Express routes
│       └── utils/         # Seed data
└── frontend/
    └── src/
        ├── app/           # Next.js pages (App Router)
        ├── components/    # Reusable components
        ├── lib/           # API client, utilities
        └── store/         # Zustand state
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| POST | /api/auth/send-otp | Send OTP |
| POST | /api/auth/verify-otp | Verify OTP |
| GET | /api/tours | Get all tours |
| GET | /api/tours/:slug | Get tour detail |
| GET | /api/vehicles | Get all vehicles |
| POST | /api/bookings | Create booking |
| GET | /api/bookings/my | My bookings |
| POST | /api/payments/razorpay/order | Create Razorpay order |
| POST | /api/payments/razorpay/verify | Verify payment |
| POST | /api/contact | Send enquiry |
| POST | /api/coupons/validate | Validate coupon |
| GET | /api/admin/dashboard | Admin stats |

---

## Deployment

### Frontend → Vercel
```bash
cd frontend
npx vercel --prod
```

### Backend → Render
1. Push to GitHub
2. Create new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add all environment variables

---

## Contact

**GRD Travels**
- Address: A36 Chander Vihar, Vikaspuri, Delhi - 110041
- Phone: +91 8595995437 / +91 9810709148
- Email: info@grdtravels.com
