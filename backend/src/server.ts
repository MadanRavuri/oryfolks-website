import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Resume from './models/Resume';
import Contact from './models/Contact';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (_req: Express.Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, uploadsDir);
  },
  filename: function (_req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
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
const MONGODB_URI = process.env.MONGODB_URI as string; // Get from environment variables

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Resume Routes
// @ts-ignore
app.post('/api/resume', upload.single('resumeFile'), async (req: Request, res: Response) => {
  try {
    console.log('Received resume data:', req.body);
    // Explicitly type req.file after multer has potentially added it
    const file = req.file as Express.Multer.File | undefined;
    console.log('Received file:', file);

    if (!file) {
      res.status(400).json({ message: 'Resume file is required' });
      return; // Keep return here to stop execution after sending response
    }

    const resumeData = {
      ...req.body,
      resumeFile: file.filename,
      skills: req.body.skills.split(',').map((skill: string) => skill.trim())
    };

    const resume = new Resume(resumeData);
    const savedResume = await resume.save();
    console.log('Saved resume:', savedResume);
    res.status(201).json(savedResume);
    return; // Explicitly return void after successful response

  } catch (error: any) {
    console.error('Error saving resume:', error);
    if (error.message.includes('Invalid file type')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Failed to save resume' });
    }
    return; // Explicitly return void after error response
  }
});

app.get('/api/resume', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Contact Routes
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact data:', req.body);
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    console.log('Saved contact:', savedContact);
    res.status(201).json(savedContact);
  } catch (error: any) {
    console.error('Error saving contact:', error);
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

export default app; 