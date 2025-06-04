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
  'https://oryfolks.com',
  'https://www.oryfolks.com',
  'https://oryfolks-website-git-main-madan-ravuris-projects.vercel.app',
  'https://oryfolks-website-ojqfs9f65-madan-ravuris-projects.vercel.app',
  'http://localhost:5173' // for local development
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
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

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

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
    next(error);
  }
});

app.get('/api/resume', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error: any) {
    next(error);
  }
});

// Contact Routes
app.post('/api/contact', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Received contact data:', req.body);
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    console.log('Saved contact:', savedContact);
    res.status(201).json(savedContact);
  } catch (error: any) {
    next(error);
  }
});

app.get('/api/contact', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error: any) {
    next(error);
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  if (err.message.includes('Invalid file type')) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

export default app; 