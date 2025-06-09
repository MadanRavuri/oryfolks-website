import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';
import Resume from './models/Resume';
import Contact from './models/Contact';

dotenv.config();
console.log('Serverless function starting up...');

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration for production
const allowedOrigins = [
  'https://oryfolks-website.vercel.app',
  'https://oryfolks.com',
  'https://www.oryfolks.com',
  'https://oryfolks-website-git-main-madan-ravuris-projects.vercel.app',
  'https://oryfolks-website-ojqfs9f65-madan-ravuris-projects.vercel.app',
  'http://localhost:5173', // for local development
  'http://localhost:3000', // additional local development port
  'http://127.0.0.1:5173', // additional local development URL
  'http://127.0.0.1:3000',  // additional local development URL
  'https://oryfolks-website-n2aw.vercel.app'
];

// CORS middleware configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle OPTIONS requests explicitly
app.options('*', cors());

// Middleware
app.use(express.json({ limit: '50mb' }));

// Configure multer for memory storage (for serverless environment)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOC files are allowed.'));
    }
  }
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/oryfolks';

// Connect to MongoDB with retry logic
const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...');
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Resume Routes
app.post('/api/resume', upload.single('resumeFile'), async (req: Request, res: Response) => {
  console.log('POST /api/resume route hit.');
  try {
    console.log('Received resume data:', req.body);
    const file = req.file as Express.Multer.File | undefined;
    console.log('Received file:', file);

    if (!file) {
      return res.status(400).json({ 
        success: false,
        message: 'Resume file is required' 
      });
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'position', 'experience', 'education', 'skills'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Store file in base64 format
    const fileBase64 = file.buffer.toString('base64');
    const fileData = `data:${file.mimetype};base64,${fileBase64}`;

    const resumeData = {
      ...req.body,
      resumeFile: fileData,
      skills: req.body.skills.split(',').map((skill: string) => skill.trim())
    };

    const resume = new Resume(resumeData);
    const savedResume = await resume.save();
    
    // Set content type header explicitly
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json({
      success: true,
      data: savedResume,
      message: 'Resume submitted successfully'
    });

  } catch (error: any) {
    console.error('Error saving resume:', error);
    
    // Set content type header explicitly
    res.setHeader('Content-Type', 'application/json');
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: Object.values(error.errors).map((err: any) => err.message)
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: 'Error saving resume',
      error: error.message
    });
  }
});

app.get('/api/resume', async (_req: Request, res: Response) => {
  console.log('GET /api/resume route hit.');
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error: any) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Error fetching resumes' });
  }
});

// Contact Routes
app.post('/api/contact', async (req: Request, res: Response) => {
  console.log('POST /api/contact route hit.');
  try {
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error('Empty request body received');
      res.status(400).json({ 
        error: 'Request body is empty',
        message: 'Please provide contact information'
      });
      return;
    }

    const contact = new Contact(req.body);
    console.log('Created contact object:', contact);
    
    const savedContact = await contact.save();
    console.log('Successfully saved contact:', savedContact);
    
    res.status(201).json({
      success: true,
      data: savedContact,
      message: 'Contact form submitted successfully'
    });
  } catch (error: any) {
    console.error('Error in /api/contact:', error);
    console.error('Error stack:', error.stack);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: error.message,
        details: Object.values(error.errors).map((err: any) => err.message)
      });
      return;
    }
    
    // Handle other errors
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'An error occurred while processing your request'
    });
  }
});

app.get('/api/contact', async (_req: Request, res: Response) => {
  console.log('GET /api/contact route hit.');
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  
  // Handle multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size too large. Maximum size is 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Handle syntax errors
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON'
    });
  }

  // Handle other errors
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  console.log('GET /api/health route hit.');
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; 