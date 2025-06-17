import { useState, useEffect } from 'react';

interface Resume {
  _id: string;
  name: string;
  email: string;
  position: string;
  resumeFile: string;
  createdAt: string;
  experience: string;
  education: string;
  skills: string[];
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState('');
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [activeTab, setActiveTab] = useState<'resumes' | 'contacts'>('resumes');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      fetchResumes();
      fetchContacts();
    } else {
      setError('Invalid credentials');
    }
  };

  const fetchResumes = async () => {
    try {
      const response = await fetch('https://oryfolks-website.vercel.app/api/resume');
      if (!response.ok) throw new Error('Failed to fetch resumes');
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError('Failed to fetch resumes');
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://oryfolks-website.vercel.app/api/contact');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to fetch contacts');
    }
  };

  const downloadResume = (resumeFile: string, name: string) => {
    const link = document.createElement('a');
    link.href = resumeFile;
    link.download = `${name}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewResume = (resume: Resume) => {
    setSelectedResume(resume);
  };

  const viewContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('resumes')}
                className={`${
                  activeTab === 'resumes'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Resume Applications
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`${
                  activeTab === 'contacts'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Contact Form Submissions
              </button>
            </nav>
          </div>
        </div>

        {/* Resume Applications */}
        {activeTab === 'resumes' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resumes.map((resume) => (
                    <tr key={resume._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{resume.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{resume.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{resume.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(resume.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewResume(resume)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => downloadResume(resume.resumeFile, resume.name)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contact Form Submissions */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewContact(contact)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Resume Preview Modal */}
        {selectedResume && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[90vh] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{selectedResume.name}</h3>
                  <p className="text-sm text-gray-600">{selectedResume.position}</p>
                </div>
                <button 
                  onClick={() => setSelectedResume(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <p className="text-sm text-gray-600">Email: {selectedResume.email}</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Experience</h4>
                      <p className="text-sm text-gray-600">{selectedResume.experience}</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Education</h4>
                      <p className="text-sm text-gray-600">{selectedResume.education}</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedResume.skills?.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Resume Preview</h4>
                    <iframe
                      src={selectedResume.resumeFile}
                      className="w-full h-[calc(90vh-200px)] border rounded"
                      title="Resume Preview"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Message Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-lg shadow-xl w-[90vw] max-w-2xl">
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{selectedContact.name}</h3>
                  <p className="text-sm text-gray-600">{selectedContact.subject}</p>
                </div>
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Contact Information</h4>
                    <p className="text-sm text-gray-600">Email: {selectedContact.email}</p>
                    <p className="text-sm text-gray-600">Phone: {selectedContact.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Message</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Date Received</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 