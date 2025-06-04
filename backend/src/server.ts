import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import Resume from './models/Resume';
import Contact from './models/Contact';

dotenv.config();

const app = express();

// CORS configuration for production
const allowedOrigins = [
  'https://oryfolks-website.vercel.app',
  'https://oryfolks-website-git-main-madan-ravuris-projects.vercel.app',
  'https://oryfolks-website-6s1uwo2z4-madan-ravuris-projects.vercel.app',
  'https://oryfolks.com',
  'https://www.oryfolks.com',
  'http://localhost:5173' // for local development
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

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
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB with retry logic
const connectWithRetry = async () => {
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

// Initial connection
connectWithRetry();

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectWithRetry();
});

// Request validation middleware
const validateContactRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !phone || !subject || !message) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }
  if (!email.includes('@')) {
    res.status(400).json({ message: 'Invalid email format' });
    return;
  }
  next();
};

// Resume Routes
app.post('/api/resume', upload.single('resumeFile'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Received resume data:', req.body);
    const file = req.file as Express.Multer.File | undefined;
    console.log('Received file:', file);

    if (!file) {
      res.status(400).json({ message: 'Resume file is required' });
      return;
    }

    // Validate required fields
    const { name, email, phone, position, experience, education, skills } = req.body;
    if (!name || !email || !phone || !position || !experience || !education || !skills) {
      res.status(400).json({ message: 'All fields are required' });
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
    next(error);
  }
});

app.get('/api/resume', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error: any) {
    console.error('Error fetching resumes:', error);
    next(error);
  }
});

// Contact Routes
app.post('/api/contact', validateContactRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Received contact data:', req.body);
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    console.log('Saved contact:', savedContact);
    res.status(201).json(savedContact);
  } catch (error: any) {
    console.error('Error saving contact:', error);
    next(error);
  }
});

app.get('/api/contact', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    next(error);
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  if (err.message.includes('Invalid file type')) {
    res.status(400).json({ message: err.message });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ message: err.message });
  } else if (err.name === 'MongoError' && err.code === 11000) {
    res.status(400).json({ message: 'Duplicate entry found' });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ 
    status: 'ok',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

export default app; 