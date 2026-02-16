import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import Resume from './models/Resume';
import Contact from './models/Contact';
import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';

dotenv.config();
console.log('Serverless function starting up...');

// Configure SendGrid
if (!process.env.SENDGRID_API_KEY) {
  console.error('SENDGRID_API_KEY is not set in environment variables');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API key configured');
}

const app = express();

// CORS configuration: allow specifying ALLOWED_ORIGINS as a comma-separated env var
const defaultAllowedOrigins = [
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

const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
const allowedOrigins = allowedOriginsEnv
  ? allowedOriginsEnv.split(',').map(s => s.trim()).filter(Boolean)
  : defaultAllowedOrigins;

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

    // Send email to HR with attachment
    try {
      await sgMail.send({
        to: 'hr@oryfolks.com',
        from: 'ravurimadan@gmail.com',
        replyTo: req.body.email,
        subject: `New Resume Submission from ${req.body.name}`,
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\nPosition: ${req.body.position}\nExperience: ${req.body.experience}\nEducation: ${req.body.education}\nSkills: ${req.body.skills}`,
        html: `<h2>New Resume Submission</h2>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Phone:</strong> ${req.body.phone}</p>
          <p><strong>Position:</strong> ${req.body.position}</p>
          <p><strong>Experience:</strong> ${req.body.experience}</p>
          <p><strong>Education:</strong> ${req.body.education}</p>
          <p><strong>Skills:</strong> ${req.body.skills}</p>`,
        attachments: [
          {
            content: fileBase64,
            filename: file.originalname,
            type: file.mimetype,
            disposition: 'attachment'
          }
        ]
      });
      console.log('Resume email sent successfully');
    } catch (emailError: any) {
      console.error('Error sending resume email:', emailError);
      // Continue with the response even if email fails
    }

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

    // Send email to HR
    try {
      await sgMail.send({
        to: 'hr@oryfolks.com',
        from: 'ravurimadan@gmail.com',
        replyTo: req.body.email,
        subject: `New Contact Form Submission from ${req.body.name}`,
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\nSubject: ${req.body.subject}\nMessage: ${req.body.message}`,
        html: `<h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Phone:</strong> ${req.body.phone}</p>
          <p><strong>Subject:</strong> ${req.body.subject}</p>
          <p><strong>Message:</strong> ${req.body.message}</p>`
      });
      console.log('Contact form email sent successfully');
    } catch (emailError: any) {
      console.error('Error sending contact form email:', emailError);
      // Continue with the response even if email fails
    }
    
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

// Endpoint to fetch resumes
app.get('/api/resumes', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    const formattedResumes = resumes.map(resume => ({
      id: resume._id,
      name: resume.name,
      data: resume.resumeFile // Include base64 data for download
    }));
    res.json(formattedResumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple jobs endpoint (returns mock data). Supports optional ?status=OPEN
app.get('/api/jobs', async (req, res) => {
  try {
    const status = (req.query.status as string) || 'OPEN';

    // Mocked job listings for the frontend chatbot. Replace with DB queries when available.
    const allJobs = [
      {
        _id: 'job_1',
        role: 'Software Engineer',
        location: 'Nellore, India',
        type: 'Full-time',
        department: 'Engineering',
        salary: 'Competitive',
        status: 'OPEN'
      },
      {
        _id: 'job_2',
        role: 'HR Executive',
        location: 'Nellore, India',
        type: 'Full-time',
        department: 'Human Resources',
        salary: 'Competitive',
        status: 'OPEN'
      },
      {
        _id: 'job_3',
        role: 'Receptionist / Admin',
        location: 'Nellore, India',
        type: 'Full-time',
        department: 'Administration',
        salary: 'TBD',
        status: 'OPEN'
      }
    ];

    const filtered = allJobs.filter(j => j.status === status);
    res.json(filtered.length ? filtered : []);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple about endpoint (returns mock about/contact data)
app.get('/api/about', (_req, res) => {
  try {
    const about = {
      companyInfo: {
        mission: 'Bridge Japan and India through technology, language, and inclusive talent.',
        vision: 'Enable cross-border collaboration by connecting people and technology across regions.',
        description: 'oryfolks connects Japanese businesses with Indian engineering talent and language services to enable cross-border collaboration and innovation',
        foundedYear: 2025,
        teamSize: '10-50',
        headquarters: 'Nellore, India'
      },
      contactInfo: {
        email: 'info@oryfolks.com',
        phone: '+91 0861-4500024',
        address: 'Plot No. 25/11/23, Savithri Nagar 3rd street, Vedayapalem, Nellore 524004',
        mapUrl: ''
      }
    };
    res.json(about);
  } catch (error) {
    console.error('Error fetching about data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error in middleware:', err);
  if (err.message.includes('Invalid file type')) {
    res.status(400).json({ message: err.message });
  } else if (err.name === 'SyntaxError') {
    res.status(400).json({ message: 'Invalid request format' });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  console.log('GET /api/health route hit.');
  res.status(200).json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 