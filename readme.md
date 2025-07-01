# Flipr - Real Estate Management Platform

A full-stack real estate management platform built with React, TypeScript, Node.js, Express, and MongoDB. Features include project management, client testimonials, contact forms, newsletter subscriptions, and an admin panel with image cropping capabilities.

## 🚀 Features

### Frontend (React + TypeScript + Vite)
- **Landing Page** with project showcase and client testimonials
- **Admin Panel** for managing projects, clients, contacts, and subscriptions
- **Image Cropping** functionality (450×350px) for projects and clients
- **Contact Form** integration with backend
- **Newsletter Subscription** system
- **Responsive Design** with Tailwind CSS
- **Modern UI** with Lucide React icons

### Backend (Node.js + Express + TypeScript)
- **RESTful API** with full CRUD operations
- **MongoDB** database with Mongoose ODM
- **Cloudinary** integration for image storage and processing
- **File Upload** with automatic image cropping
- **CORS** configuration for cross-origin requests
- **Serverless** deployment ready (Vercel)
- **Environment Variables** support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Flipr
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

#### Environment Variables (.env)

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flipr_db

# Server Configuration
PORT=5000
NODE_ENV=development

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5174

# Upload Configuration
UPLOAD_PATH=./uploads
```

#### Setup Cloudinary (Required for Image Uploads)

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add these credentials to your `.env` file

#### Start Backend Server

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The backend will be available at `http://localhost:5000`

#### Seed Sample Data (Optional)

```bash
# Add sample projects and clients to database
node seed.js
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5174`

## 📁 Project Structure

```
Flipr/
├── backend/                 # Backend application
│   ├── src/
│   │   ├── config/         # Database and Cloudinary configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── app.ts         # Express app configuration
│   │   └── server.ts      # Server entry point
│   ├── build/             # Compiled TypeScript output
│   ├── uploads/           # Local file uploads (development)
│   ├── .env               # Environment variables
│   ├── vercel.json        # Vercel deployment config
│   └── package.json
│
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── App.tsx        # Main App component
│   │   └── main.tsx       # App entry point
│   ├── public/            # Static assets
│   ├── vite.config.ts     # Vite configuration
│   └── package.json
│
└── README.md              # This file
```

## 🌐 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (with image upload)
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client (with image upload)
- `GET /api/clients/:id` - Get single client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Contacts
- `GET /api/contacts` - Get all contact form submissions
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts/:id` - Get single contact
- `PATCH /api/contacts/:id/read` - Mark contact as read
- `DELETE /api/contacts/:id` - Delete contact

### Subscriptions
- `GET /api/subscriptions` - Get all email subscriptions
- `POST /api/subscriptions` - Subscribe to newsletter
- `POST /api/subscriptions/unsubscribe` - Unsubscribe email
- `GET /api/subscriptions/stats` - Get subscription statistics

## 🎨 Admin Panel Features

Access the admin panel at `http://localhost:5174/admin`

### Project Management
- Add new projects with image upload and cropping (450×350px)
- View all projects with images, names, descriptions, and dates
- Delete existing projects

### Client Management
- Add client testimonials with images, names, descriptions, and designations
- View all client testimonials
- Delete client entries

### Contact Form Management
- View all contact form submissions
- See full name, email, mobile number, city, and message
- Delete contact entries

### Subscription Management
- View all newsletter subscriptions
- See email addresses and subscription dates
- Delete subscription entries

## 🚀 Deployment

### Backend Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy Backend**:
   ```bash
   cd backend
   vercel --prod
   ```

3. **Set Environment Variables** in Vercel dashboard:
   - `MONGODB_URI`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV=production`

### Frontend Deployment (Vercel)

1. **Deploy Frontend**:
   ```bash
   cd frontend
   vercel --prod
   ```

2. **Update Backend CORS** with your frontend URL in the `.env` file

## 🔧 Development Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run deploy` - Deploy to Vercel

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛡️ Security Features

- **CORS** protection with specific origin allowlist
- **Input validation** with Mongoose schemas
- **File upload restrictions** (images only, 5MB limit)
- **Environment variables** for sensitive data
- **Request size limits** (10MB)

## 🎯 Key Technologies

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Image Crop** for image cropping
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **Cloudinary** for image storage
- **Multer** for file uploads
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 🔄 Data Models

### Project
```typescript
{
  _id: ObjectId
  name: string
  description: string
  image: string (Cloudinary URL)
  createdAt: Date
  updatedAt: Date
}
```

### Client
```typescript
{
  _id: ObjectId
  name: string
  description: string
  designation: string
  image: string (Cloudinary URL)
  createdAt: Date
  updatedAt: Date
}
```

### Contact
```typescript
{
  _id: ObjectId
  fullName: string
  email: string
  mobileNumber: string
  city: string
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Subscription
```typescript
{
  _id: ObjectId
  email: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

## 🎮 Usage

1. **Start both servers** (backend on :5000, frontend on :5174)
2. **Visit the landing page** to see projects and client testimonials
3. **Fill out the contact form** to test backend integration
4. **Subscribe to newsletter** to test subscription functionality
5. **Access admin panel** at `/admin` to manage content
6. **Add projects and clients** with image cropping functionality

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
2. **Database Connection**: Verify `MONGODB_URI` is correct and database is accessible
3. **Image Upload Issues**: Ensure Cloudinary credentials are set correctly
4. **Port Conflicts**: Change ports in `.env` if 5000 or 5174 are in use

### Debug Commands

```bash
# Check backend API
curl http://localhost:5000/api

# Check MongoDB connection
node -e "require('./build/config/database.js').default()"

# Test Cloudinary connection
node -e "console.log(require('./build/config/cloudinary.js').default)"
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

Built with ❤️ by Ujjwal Tamrakar