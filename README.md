# OryFolks Website

A modern, responsive website for OryFolks, built with React and Node.js, featuring a clean design and comprehensive business solutions.

// Triggering deployment to test MongoDB connection with improved connection handling and event listeners

## 🌟 Features

- **Modern UI/UX**: Built with React and styled using Tailwind CSS
- **Internationalization**: Multi-language support using i18next
- **Responsive Design**: Fully responsive layout for all devices
- **Interactive Components**: 
  - Hero carousel
  - Video sections
  - Dynamic forms
  - Interactive navigation
- **Backend Integration**: Node.js backend with MongoDB database
- **File Upload**: Support for resume and document uploads
- **Contact System**: Integrated contact form with backend storage

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- i18next
- Vite

### Backend
- Node.js (TypeScript)
- Express
- MongoDB (Mongoose)
- Multer (for file uploads)
- Note: Prisma migration files exist under `api/prisma` but runtime persistence uses Mongoose/MongoDB

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/MadanRavuri/oryfolks-website.git
cd oryfolks-website
```

2. Install frontend dependencies (root):

```bash
npm install
```

3. Install backend dependencies (api folder):

```bash
cd api
npm install
```

4. Create a `.env` file in the `api` directory with these variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
SENDGRID_API_KEY=your_sendgrid_api_key  # optional, only if you want email notifications
```

## 🚀 Running the application (development)

1. Start the backend (API) in development:

```bash
cd api
npm run dev
```

This runs the server with `ts-node` per `api/package.json`. For production build & start:

```bash
cd api
npm run build
npm start
```

2. Start the frontend development server (from repo root):

```bash
npm run dev
```

By default the frontend dev server runs on `http://localhost:5173`. The frontend expects the API at `http://localhost:5000/api` in development (see `src/config.ts`).

## 📁 Project structure

```
project/
├── src/                  # Frontend source code (React + TypeScript)
│   ├── components/       # Reusable components (Header, Footer, Hero, etc.)
│   ├── pages/            # Page components (Home, About, Services, Contact...)
│   ├── i18n/             # Internationalization setup and locales
│   └── assets/           # Local static assets used by the app
├── api/                  # Backend (Express + TypeScript)
│   ├── index.ts          # Server entry (compiled to dist/ for production)
│   ├── models/           # Mongoose models (Contact, Resume)
│   ├── prisma/           # Prisma migration files (optional/legacy)
│   └── uploads/          # (uploads directory; multer uses memory storage in server code)
├── public/               # Public assets (images, favicon, logo)
└── README.md
```

## 🌐 Pages

- Home
- About Us
- Services
  - BOT Vision
  - IT Staffing
  - Full Cycle Development
- Careers (with Application Form)
- Blog
- Contact Us
- Events

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Madan Ravuri - [GitHub](https://github.com/MadanRavuri)

Project Link: [https://github.com/MadanRavuri/oryfolks-website](https://github.com/MadanRavuri/oryfolks-website)

// Notes
- Resume uploads are stored as base64 data URIs in MongoDB by default (see `api/models/Resume.ts`). For production, consider moving file storage to object storage (S3/GCS) and storing references in DB.
- The API will try to send emails using SendGrid if `SENDGRID_API_KEY` is set; otherwise it only saves submissions to MongoDB.

## 🚢 Deployment & Security (Recommended)

1) Rotate exposed credentials immediately
- If you have any credentials in `api/.env` (MongoDB connection or SendGrid key), rotate them now. Treat any keys in that file as compromised and replace them in the provider dashboards (Atlas/SendGrid). Update the Render environment variables with the new secrets.

2) Backend (Render)
- Add these environment variables on Render for your web service:
  - `MONGODB_URI` (your rotated connection string)
  - `SENDGRID_API_KEY` (rotated SendGrid key)
  - `ALLOWED_ORIGINS` (comma-separated list of frontend domains; e.g. `https://your-bluehost-domain.com,https://www.your-bluehost-domain.com`)
- Redeploy after setting environment variables.

3) Frontend (Bluehost shared hosting)
- Build the frontend with the Render API URL baked in. In PowerShell:
  ```powershell
  $env:VITE_API_URL = 'https://oryfolks-website.onrender.com/api'
  npm run build
  ```
- Upload the generated `dist/` contents to your Bluehost site (public_html).

4) Verify and test
- Health check: `https://oryfolks-website.onrender.com/api/health` should return `{ "status": "ok" }`.
- From the hosted frontend, submit the Contact form and an Application form to verify requests reach the Render backend.

5) Optional improvements
- Add rate-limiting for contact/resume endpoints (e.g. `express-rate-limit`).
- Move file storage to S3/GCS and store URLs in MongoDB for production-scale.
- Add Google Search Console and submit `https://oryfolks.com/sitemap.xml`.