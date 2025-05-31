import { ChevronRight, Building, BarChart3, Globe, Users, Lightbulb, Calendar, BookOpen, MessageCircle, Code, Briefcase, Users2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Card, { CardContent } from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const serviceCategories = [
    {
      id: 'engineering',
      title: 'Engineering Solutions',
      description: 'Comprehensive engineering services to drive innovation and technical excellence.',
      services: [
        {
          id: 'bot',
          icon: <Code className="text-secondary-500" size={40} />,
          title: 'BOT Vision',
          description: 'Dedicated, long-term collaboration with top-tier bilingual engineers focused on your vision.',
          features: [
            'Long-term dedicated engineering teams',
            'Bilingual technical expertise',
            'Strategic vision alignment',
            'Continuous innovation and improvement',
            'Deep domain knowledge and experience',
            'Seamless communication and collaboration'
          ],
          learnMorePath: '/services/bot-vision'
        },
        {
          id: 'staffing',
          icon: <Briefcase className="text-secondary-500" size={40} />,
          title: 'IT Staffing',
          description: 'Flexible, short-term contracts providing agile support for your project timelines.',
          features: [
            'Flexible contract durations',
            'Agile project support',
            'Specialized technical skills',
            'Quick team scaling',
            'Cost-effective solutions',
            'Project-specific expertise'
          ],
          learnMorePath: '/services/it-staffing'
        },
        {
          id: 'full-cycle',
          icon: <Users2 className="text-secondary-500" size={40} />,
          title: 'Full Cycle Development',
          description: 'Custom-fit teams for AI development, product architecture, and more — built for high-impact results.',
          features: [
            'AI development expertise',
            'Product architecture design',
            'Custom team composition',
            'End-to-end project delivery',
            'High-impact results focus',
            'Scalable team solutions'
          ],
          learnMorePath: '/services/full-cycle'
        },
      ],
    }
  ];

  return (
    <>
      <Hero
        title="Our Services"
        subtitle="Comprehensive engineering solutions designed to drive innovation, excellence, and sustainable impact."
        image="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        size="md"
      />

      {/* Services Overview */}
      <Section background="white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">How We Can Help</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At OryFolks, we offer flexible engineering solutions designed to meet your specific needs, whether you're looking for long-term partnerships, contract-based support, or project-specific teams.
          </p>
        </div>

        <div className="space-y-16">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4">{category.title}</h3>
                <p className="text-lg text-gray-600">{category.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
                  >
                    <div>
                      <div className="mb-6">
                        {service.icon}
                      </div>
                      <h4 className="text-xl font-semibold text-primary-800 mb-4">{service.title}</h4>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="text-primary-600 mt-1 flex-shrink-0" size={20} />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto pt-2">
                      <Link 
                        to={service.learnMorePath}
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        Learn More
                        <ChevronRight size={20} className="ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Our Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We follow a structured approach to ensure successful project delivery and client satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: 1, title: 'Discovery', description: 'We begin by understanding your needs, goals, and challenges through detailed consultations.' },
            { number: 2, title: 'Planning', description: 'Our team develops a comprehensive strategy and timeline tailored to your requirements.' },
            { number: 3, title: 'Execution', description: 'We implement the solution with regular updates and transparent communication.' },
            { number: 4, title: 'Support', description: 'Ongoing maintenance and support ensure long-term success and continuous improvement.' },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <div className="absolute -top-4 -left-4 bg-primary-600 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-4 mt-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section background="primary" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Contact us today to discuss how our engineering solutions can help your organization achieve its goals and create lasting impact.
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => window.location.href = '/contact'}
            className="hover:scale-105 transition-transform duration-300"
        >
          Schedule a Consultation
        </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default ServicesPage;