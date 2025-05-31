import { motion } from 'framer-motion';
import { Code, Layers, Cpu, Zap, Target, Users } from 'lucide-react';
import Hero from '../../components/Hero';
import Section from '../../components/Section';
import Card from '../../components/Card';
import Button from '../../components/Button';

const FullCyclePage = () => {
  const services = [
    {
      icon: <Code className="text-primary-600" size={32} />,
      title: "End-to-End Development",
      description: "Complete software development lifecycle from concept to deployment and maintenance."
    },
    {
      icon: <Layers className="text-primary-600" size={32} />,
      title: "Architecture Design",
      description: "Scalable and robust system architecture designed for future growth and flexibility."
    },
    {
      icon: <Cpu className="text-primary-600" size={32} />,
      title: "AI Integration",
      description: "Seamless integration of artificial intelligence and machine learning capabilities."
    }
  ];

  const benefits = [
    {
      icon: <Target className="text-primary-600" size={24} />,
      title: "Strategic Planning",
      description: "Comprehensive project planning and resource allocation for optimal results."
    },
    {
      icon: <Zap className="text-primary-600" size={24} />,
      title: "Agile Development",
      description: "Flexible and iterative development process ensuring timely delivery."
    },
    {
      icon: <Users className="text-primary-600" size={24} />,
      title: "Expert Team",
      description: "Skilled professionals with extensive experience in full-cycle development."
    }
  ];

  return (
    <>
      <Hero
        title="Full Cycle Development"
        subtitle="Comprehensive software development solutions from concept to deployment"
        image="/fullcycle.jpg"
        size="lg"
      />

      {/* Overview Section */}
      <Section background="white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary-800 mb-6"
          >
            End-to-End Development Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Our full-cycle development services cover every aspect of software development, ensuring seamless delivery of high-quality solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 text-center">
                <div className="mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section background="light">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              Why Choose Our Full Cycle Development?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the advantages of our comprehensive development approach, designed to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  {benefit.icon}
                  <h3 className="text-xl font-semibold text-primary-800">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Development Process Section */}
      <Section background="white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              Our Development Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A systematic approach to delivering high-quality software solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-primary-800 mb-4">
                Planning & Design
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>Requirements gathering and analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>System architecture design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>Technology stack selection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>Project timeline and resource planning</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-primary-800 mb-4">
                Development & Deployment
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>Agile development methodology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>Continuous integration and testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>Quality assurance and optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>Deployment and maintenance</span>
                </li>
              </ul>
            </motion.div>
          </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your development needs and discover how we can help bring your vision to life.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/contact'}
            className="hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default FullCyclePage; 