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
- Node.js
- Express
- MongoDB
- Multer (for file uploads)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/MadanRavuri/oryfolks-website.git
cd oryfolks-website
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## 🚀 Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
# In the root directory
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
oryfolks-website/
├── src/                    # Frontend source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── i18n/             # Internationalization
│   └── assets/           # Static assets
├── api/              # Backend source code
│   ├── src/             # Server code
│   ├── models/          # Database models
│   └── uploads/         # File upload directory
└── public/              # Public assets
```

## 🌐 Pages

- Home
- About Us
- Services
  - BOT Vision
  - IT Staffing
  - Full Cycle Development
- Careers
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

// Triggering another deployment to test MongoDB connection after updating Atlas IP whitelist 