import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import Resume from './models/Resume';
import Contact from './models/Contact';

dotenv.config();
console.log('Serverless function starting up...');

const app = express();

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
app.use(express.json({ limit: '50mb', strict: true }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Add request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`, {
    headers: req.headers,
    body: req.body,
    query: req.query
  });
  next();
});

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
      res.status(400).json({ message: 'Resume file is required' });
      return;
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
    console.log('Saved resume:', savedResume);
    res.status(201).json(savedResume);

  } catch (error: any) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Error saving resume' });
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
    // Log the complete request details
    console.log('Request details:', {
      headers: req.headers,
      body: req.body,
      method: req.method,
      url: req.url,
      query: req.query
    });
    
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error('Empty request body received');
      const response = { 
        success: false,
        error: 'Validation Error',
        message: 'Please provide contact information'
      };
      console.log('Sending validation error response:', response);
      return res.status(400).json(response);
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      const response = {
        success: false,
        error: 'Validation Error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      };
      console.log('Sending validation error response:', response);
      return res.status(400).json(response);
    }

    // Create and save contact
    const contact = new Contact(req.body);
    console.log('Created contact object:', contact);
    
    const savedContact = await contact.save();
    console.log('Successfully saved contact:', savedContact);
    
    // Send success response
    const response = {
      success: true,
      data: savedContact,
      message: 'Contact form submitted successfully'
    };
    
    console.log('Sending success response:', response);
    res.status(201).json(response);
    console.log('Response sent successfully');
    
  } catch (error: any) {
    console.error('Error in /api/contact:', error);
    console.error('Error stack:', error.stack);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const response = {
        success: false,
        error: 'Validation Error',
        message: error.message,
        details: Object.values(error.errors).map((err: any) => err.message)
      };
      console.log('Sending validation error response:', response);
      res.status(400).json(response);
      console.log('Validation error response sent');
      return;
    }
    
    // Handle mongoose errors
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      const response = {
        success: false,
        error: 'Database Error',
        message: 'A database error occurred'
      };
      console.log('Sending database error response:', response);
      res.status(500).json(response);
      console.log('Database error response sent');
      return;
    }
    
    // Handle other errors
    const response = {
      success: false,
      error: 'Server Error',
      message: 'An error occurred while processing your request'
    };
    console.log('Sending server error response:', response);
    res.status(500).json(response);
    console.log('Server error response sent');
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
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error in middleware:', err);
  console.error('Error stack:', err.stack);
  
  // Ensure we always send a valid JSON response
  try {
    // Handle JSON parsing errors
    if (err instanceof SyntaxError && 'body' in err) {
      const response = {
        success: false,
        error: 'Invalid JSON',
        message: 'The request body contains invalid JSON'
      };
      console.log('Sending JSON parsing error response:', response);
      return res.status(400).json(response);
    }
    
    // Handle file type errors
    if (err.message && err.message.includes('Invalid file type')) {
      const response = {
        success: false,
        error: 'Invalid File Type',
        message: err.message
      };
      console.log('Sending file type error response:', response);
      return res.status(400).json(response);
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const response = {
        success: false,
        error: 'Validation Error',
        message: err.message,
        details: Object.values(err.errors).map((e: any) => e.message)
      };
      console.log('Sending validation error response:', response);
      return res.status(400).json(response);
    }
    
    // Handle mongoose errors
    if (err.name === 'MongoError' || err.name === 'MongoServerError') {
      const response = {
        success: false,
        error: 'Database Error',
        message: 'A database error occurred'
      };
      console.log('Sending database error response:', response);
      return res.status(500).json(response);
    }
    
    // Handle other errors
    const response = {
      success: false,
      error: 'Server Error',
      message: err.message || 'An unexpected error occurred'
    };
    console.log('Sending server error response:', response);
    return res.status(500).json(response);
  } catch (error: any) {
    // If something goes wrong in our error handling, send a safe error response
    console.error('Error in error handler:', error);
    const response = {
      success: false,
      error: 'Server Error',
      message: 'An unexpected error occurred'
    };
    console.log('Sending fallback error response:', response);
    return res.status(500).json(response);
  }
});

// Add a catch-all route for undefined routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  console.log('GET /api/health route hit.');
  res.status(200).json({ 
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 