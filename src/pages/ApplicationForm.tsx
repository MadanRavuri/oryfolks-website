import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Button from '../components/Button';
import config from '../config';

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
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
    setFormData(prev => ({ ...prev, resumeFile: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.resumeFile) {
      setError('Please select a resume file');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('resumeFile', formData.resumeFile);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('education', formData.education);
      formDataToSend.append('skills', formData.skills);

      console.log('Submitting form to:', `${config.apiUrl}/resume`);
      console.log('Form data:', Object.fromEntries(formDataToSend.entries()));

      const response = await fetch(`${config.apiUrl}/resume`, {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Server returned invalid response format');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      if (!data.success) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setSuccess('Application submitted successfully!');
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
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit application');
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
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                <p className="font-medium">Success</p>
                <p>{success}</p>
              </div>
            )}
            
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

              {/* Resume Upload */}
              <div className="col-span-2">
                <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 mb-1">
                  Resume/CV
                </label>
                <input
                  type="file"
                  id="resumeFile"
                  name="resumeFile"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Accepted formats: PDF, DOC, DOCX (max 5MB)
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
          </div>
        </div>
      </Section>
    </>
  );
};

export default ApplicationForm; 