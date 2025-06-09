import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Button from '../components/Button';
import config from '../config';

interface Resume {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  skills: string[];
  resumeFile: string;
  createdAt: string;
}

const ApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const position = new URLSearchParams(location.search).get('position') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: position,
    experience: '',
    education: '',
    skills: '',
    resumeFile: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);

  // Fetch resumes when component mounts
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/resume`);
        if (!response.ok) throw new Error('Failed to fetch resumes');
        const data = await response.json();
        setResumes(data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resumeFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!formData.resumeFile) {
        throw new Error('Please upload your resume');
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      console.log('Submitting to:', `${config.apiUrl}/resume`);
      console.log('Form data:', Object.fromEntries(formDataToSend.entries()));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for file upload

      const response = await fetch(`${config.apiUrl}/resume`, {
        method: 'POST',
        body: formDataToSend,
        signal: controller.signal,
        credentials: 'include'
      });

      clearTimeout(timeoutId);

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Log the raw response text first
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        // Try to parse the response text as JSON
        data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        console.error('Response text that failed to parse:', responseText);
        throw new Error('Server returned invalid response format');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      if (!data.success) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        education: '',
        skills: '',
        resumeFile: null
      });

      setTimeout(() => {
        setIsSubmitted(false);
        navigate('/careers');
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      if (error.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(error.message || 'Failed to submit application. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to view PDF in a new tab
  const viewPDF = (resumeId: string) => {
    window.open(`${config.apiUrl}/resume/${resumeId}/pdf`, '_blank');
  };

  // Function to download PDF
  const downloadPDF = async (resumeId: string, fileName: string) => {
    try {
      const response = await fetch(`${config.apiUrl}/resume/${resumeId}/pdf`);
      if (!response.ok) throw new Error('Failed to download PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${fileName}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  return (
    <>
      <Hero
        title="Job Application"
        subtitle="Submit your application to join our team"
        image="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        size="sm"
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate('/careers')}
            className="mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Careers
          </Button>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-primary-800 mb-6">Application Form</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            )}
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                <p className="font-medium">Thank you for your application!</p>
                <p>We've received your submission and will review it shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-gray-700 font-medium mb-1">
                      Position Applied For *
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-gray-700 font-medium mb-1">
                    Experience *
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="education" className="block text-gray-700 font-medium mb-1">
                    Education *
                  </label>
                  <textarea
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="skills" className="block text-gray-700 font-medium mb-1">
                    Skills *
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Enter your skills separated by commas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="resumeFile" className="block text-gray-700 font-medium mb-1">
                    Upload Resume (PDF/DOC) *
                  </label>
                  <input
                    type="file"
                    id="resumeFile"
                    name="resumeFile"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Maximum file size: 5MB. Accepted formats: PDF, DOC, DOCX
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  <Send size={16} className="ml-2" />
                </Button>
              </form>
            )}

            {/* Add this section to display submitted resumes */}
            {resumes.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Submitted Resumes</h3>
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div key={resume._id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{resume.name}</p>
                          <p className="text-sm text-gray-600">{resume.position}</p>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => viewPDF(resume._id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            View
                          </button>
                          <button
                            onClick={() => downloadPDF(resume._id, resume.name)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default ApplicationForm; 