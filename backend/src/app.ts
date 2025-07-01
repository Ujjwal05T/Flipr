import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/database";

// Import routes
import projectRoutes from "./routes/projectRoutes";
import clientRoutes from "./routes/clientRoutes";
import contactRoutes from "./routes/contactRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";

// Load environment variables
dotenv.config();

// Create a new express application instance
const app = express();

// Set the network port
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
    res.json({ 
        message: "Backend API is running!",
        version: "1.0.0",
        endpoints: {
            projects: "/api/projects",
            clients: "/api/clients", 
            contacts: "/api/contacts",
            subscriptions: "/api/subscriptions"
        }
    });
});

// API documentation endpoint
app.get("/api", (req: Request, res: Response) => {
    res.json({
        message: "Flipr API Documentation",
        version: "1.0.0",
        endpoints: {
            projects: {
                GET: "/api/projects - Get all projects",
                POST: "/api/projects - Create project (with image upload)",
                GET_ID: "/api/projects/:id - Get single project",
                PUT: "/api/projects/:id - Update project",
                DELETE: "/api/projects/:id - Delete project"
            },
            clients: {
                GET: "/api/clients - Get all clients",
                POST: "/api/clients - Create client (with image upload)",
                GET_ID: "/api/clients/:id - Get single client", 
                PUT: "/api/clients/:id - Update client",
                DELETE: "/api/clients/:id - Delete client"
            },
            contacts: {
                GET: "/api/contacts - Get all contact forms",
                POST: "/api/contacts - Submit contact form",
                GET_ID: "/api/contacts/:id - Get single contact",
                PATCH: "/api/contacts/:id/read - Mark as read",
                DELETE: "/api/contacts/:id - Delete contact"
            },
            subscriptions: {
                GET: "/api/subscriptions - Get all subscriptions",
                POST: "/api/subscriptions - Subscribe email",
                POST_UNSUB: "/api/subscriptions/unsubscribe - Unsubscribe",
                GET_STATS: "/api/subscriptions/stats - Get statistics"
            }
        }
    });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`API Documentation: http://localhost:${port}/api`);
});