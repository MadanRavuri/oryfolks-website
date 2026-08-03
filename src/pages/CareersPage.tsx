import { useEffect, useState } from 'react';
import { ArrowRight, Code, Users, Phone, ChevronDown, MapPin, Clock, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import config from '../config';

interface RecruitaiJob {
  id?: string;
  title?: string;
  description?: string;
  company?: string;
  location?: string;
  department?: string;
  salary?: string;
  experienceLevel?: string;
  hiringManager?: string | null;
  skills?: Array<{ name: string; weight?: number }>;
  education?: string[];
  industry?: string;
  benefits?: string[];
  requirements?: string[];
  responsibilities?: string[];
  remote?: boolean;
  deadline?: string;
  status?: string;
  publishedToCareers?: boolean;
  applicants?: number;
  createdAt?: string;
  updatedAt?: string;
  minExperience?: number;
  educationRequirement?: string;
  requiredSkills?: string[];
  employmentType?: string;
  postedDate?: string;
}

const CareersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [jobs, setJobs] = useState<RecruitaiJob[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    skills: '',
    resumeFile: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch(`${config.apiUrl}/resume`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit resume');
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
      }, 5000);
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Failed to submit resume. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchJobs = async () => {
      try {
        setIsLoadingJobs(true);
        setJobsError(null);

        const response = await fetch(config.recruitaiApiUrl, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const payload = await response.json();
        const normalizedJobs = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.value)
            ? payload.value
            : [];

        if (!isMounted) {
          return;
        }

        setJobs(normalizedJobs.filter((job: RecruitaiJob) => job.publishedToCareers !== false));
      } catch (error) {
        if (controller.signal.aborted || !isMounted) {
          return;
        }

        console.error('Error fetching jobs:', error);
        setJobsError('Unable to load live openings right now. Please check back soon.');
        setJobs([]);
      } finally {
        if (isMounted) {
          setIsLoadingJobs(false);
        }
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const jobPositions = jobs.map((job, index) => {
    const responsibilities = job.responsibilities?.length
      ? job.responsibilities
      : [
          `Contribute to ${job.department || 'team'} goals`,
          'Collaborate with cross-functional teams',
          'Help deliver high-quality outcomes',
        ];

    const requirements = job.requirements?.length
      ? job.requirements
      : [
          job.educationRequirement || 'Relevant academic background',
          job.minExperience ? `${job.minExperience}+ years of experience` : 'Relevant professional experience',
          job.requiredSkills?.length ? `Skills: ${job.requiredSkills.join(', ')}` : 'Strong problem-solving skills',
        ];

    const skills = job.requiredSkills?.length
      ? job.requiredSkills
      : job.skills?.map((skill) => skill.name) || [];

    const benefits = job.benefits?.length
      ? job.benefits
      : ['Growth opportunities', 'Collaborative work environment'];

    const normalizedDepartment = (job.department || job.industry || 'Open Role').toLowerCase();

    return {
      id: job.id || `job-${index}`,
      category: job.department || job.industry || 'Open Role',
      icon: normalizedDepartment.includes('hr')
        ? <Users className="text-secondary-500" size={40} />
        : normalizedDepartment.includes('admin')
          ? <Phone className="text-secondary-500" size={40} />
          : <Code className="text-secondary-500" size={40} />,
      title: job.title || 'Open Position',
      type: job.experienceLevel || job.employmentType || 'Open Role',
      location: job.location || 'Remote / Flexible',
      employmentType: job.employmentType || 'Full-time',
      experience: job.minExperience ? `${job.minExperience}+ years` : job.experienceLevel || 'Experience varies',
      description: job.description || 'A new opportunity with OryFolks.',
      responsibilities,
      requirements,
      skills,
      benefits,
      salary: job.salary,
      status: job.status,
      deadline: job.deadline,
      postedDate: job.postedDate,
    };
  });

  const toggleJobDetails = (index: number) => {
    setSelectedJob(selectedJob === index ? null : index);
  };

  const applicationSteps = [
    {
      step: '01',
      title: 'Application',
      description: 'Submit your application through our online portal, including your resume and cover letter.',
    },
    {
      step: '02',
      title: 'Initial Screening',
      description: 'Our HR team reviews applications and conducts initial phone interviews with qualified candidates.',
    },
    {
      step: '03',
      title: 'Technical Assessment',
      description: 'Selected candidates participate in technical interviews and assessments relevant to the position.',
    },
    {
      step: '04',
      title: 'Final Interview',
      description: 'Successful candidates meet with the team leads and department heads for final evaluation.',
    },
  ];

  return (
    <>
      <Hero
        title={t('careers.title')}
        subtitle={t('careers.description')}
        image="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        size="md"
      />

      {/* Why Join Us */}
      <Section background="white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">Why Join OryFolks?</h2>
              <p className="text-xl text-gray-700 mb-6">
                At OryFolks, we believe in nurturing talent and providing opportunities for growth. We're looking for passionate individuals who are eager to learn and contribute to our mission of bridging Japan and India through technology and innovation.
            </p>
              <p className="text-xl text-gray-700 mb-6">
                Our work environment fosters collaboration, continuous learning, and professional development. We value diversity and create equal opportunities for all team members to excel and grow in their careers.
            </p>
              <p className="text-xl text-gray-700">
                Join us in our journey to create meaningful impact through technology and cross-cultural collaboration.
            </p>
          </div>
          <div className="order-first lg:order-last">
            <img
              src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="OryFolks team"
              className="rounded-xl shadow-xl w-full h-auto"
              width={1260}
              height={750}
              loading="lazy"
              decoding="async"
            />
            </div>
          </div>
        </div>
      </Section>

      {/* Application Process */}
      <Section background="light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">Our Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's what to expect when you apply for a position at OryFolks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 relative"
            >
                <div className="absolute -top-4 -left-4 bg-primary-700 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-6 mt-4">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
            </motion.div>
          ))}
          </div>
        </div>
      </Section>

      {/* Open Positions */}
      <Section background="white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our current openings and find the perfect role for your career growth.
          </p>
        </div>

        {isLoadingJobs ? (
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-8 text-center text-gray-600">
            Loading live openings...
          </div>
        ) : jobsError ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center text-amber-700">
            {jobsError}
          </div>
        ) : jobPositions.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-8 text-center text-gray-600">
            No openings are available right now. Please check back soon.
          </div>
        ) : (
          <div className="space-y-6">
            {jobPositions.map((position, index) => (
            <motion.div
                key={position.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary-200 transition-all duration-300"
              >
                <div 
                  className="p-8 cursor-pointer"
                  onClick={() => toggleJobDetails(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="bg-primary-50 p-4 rounded-xl">
                        {position.icon}
                      </div>
                    <div>
                        <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary-700 bg-primary-50 rounded-full mb-3">
                          {position.category}
                        </span>
                        <h3 className="text-2xl font-semibold text-primary-800 mb-2">
                          {position.title}
                        </h3>
                        <p className="text-gray-600 italic mb-3">{position.type}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase size={16} />
                            <span>{position.employmentType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{position.experience}</span>
                          </div>
                          {position.salary ? (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                              Salary: {position.salary}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <ChevronDown 
                      size={24} 
                      className={`text-gray-400 transition-transform duration-300 ${
                        selectedJob === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </div>
                
                <AnimatePresence>
                  {selectedJob === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                          <div>
                            <h4 className="text-lg font-semibold text-primary-800 mb-4">Job Description</h4>
                            <p className="text-gray-700 mb-6">{position.description}</p>
                      
                            <h4 className="text-lg font-semibold text-primary-800 mb-4">Responsibilities</h4>
                            <ul className="space-y-3 mb-6">
                              {position.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex items-start">
                                  <ArrowRight size={18} className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                                  <span className="text-gray-600">{resp}</span>
                                </li>
                        ))}
                      </ul>
                      
                            <h4 className="text-lg font-semibold text-primary-800 mb-4">Requirements</h4>
                            <ul className="space-y-3">
                              {position.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start">
                                  <ArrowRight size={18} className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                                  <span className="text-gray-600">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-primary-800 mb-4">Required Skills</h4>
                            <div className="flex flex-wrap gap-3 mb-6">
                              {position.skills.map((skill, idx) => (
                                <span 
                                  key={idx}
                                  className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            <h4 className="text-lg font-semibold text-primary-800 mb-4">Benefits</h4>
                            <ul className="space-y-3 mb-6">
                              {position.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start">
                                  <ArrowRight size={18} className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                                  <span className="text-gray-600">{benefit}</span>
                                </li>
                        ))}
                      </ul>
                      
                      <Button
                        variant="primary"
                              onClick={() => navigate(`/apply?position=${encodeURIComponent(position.title)}`)}
                              className="w-full hover:scale-105 transition-transform duration-300"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                      </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.div>
          ))}
          </div>
        )}

          <div className="text-center mt-8">
            <p className="text-gray-600 text-lg mb-4">
              Don't see a position that matches your skills?
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/apply')}
              className="hover:scale-105 transition-transform duration-300"
            >
              Submit Your Resume
            </Button>
              </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section background="primary" className="text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Take the first step towards an exciting career at OryFolks. Apply now and be part of our mission to create positive change through technology and innovation.
        </p>
        <Button
          variant="secondary"
          size="lg"
            onClick={() => navigate('/apply')}
            className="hover:scale-105 transition-transform duration-300"
        >
            Apply Now
        </Button>
        </div>
      </Section>
    </>
  );
};

export default CareersPage;