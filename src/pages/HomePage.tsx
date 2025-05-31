import { ArrowRight, BarChart3, Users, Calendar, Globe, Building2, Microscope, Play } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import { useState, useRef, useEffect } from 'react';

// Video section with enhanced animations
const VideoSection = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto mt-6 px-6 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-primary-800 mb-4 tracking-tight"
      >
        {t('story.title')}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-xl text-gray-600 mb-8 leading-relaxed"
      >
        {t('story.description')}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
      >
        <video
          ref={videoRef}
          controls
          className="w-full rounded-2xl"
          preload="auto"
          playsInline
          onError={(e) => {
            console.error('Video error:', e);
            const video = e.target as HTMLVideoElement;
            console.error('Video error details:', {
              error: video.error,
              networkState: video.networkState,
              readyState: video.readyState
            });
          }}
        >
          <source src="/Ory.Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.section>
  );
};

const HomePage = () => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Video Section */}
      <Section background="light" className="pt-0">
        <VideoSection />
      </Section>

      {/* Services Overview */}
      <Section background="white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('services.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Users className="text-primary-600" size={36} />,
              title: t('services.fullTime.title'),
              description: t('services.fullTime.description'),
              image: "/Bot.jpg",
              imageAlt: "Bot Vision Services",
              link: "/services/bot-vision"
            },
            {
              icon: <Calendar className="text-primary-600" size={36} />,
              title: t('services.contract.title'),
              description: t('services.contract.description'),
              image: "/contactbased.jpg",
              imageAlt: "Contact-based Services",
              link: "/services/it-staffing"
            },
            {
              icon: <BarChart3 className="text-primary-600" size={36} />,
              title: "Full Cycle Services",
              description: t('services.project.description'),
              image: "/fullcycle.jpg",
              imageAlt: "Full Cycle Services",
              link: "/services/full-cycle"
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="transition-all duration-300"
            >
              <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 overflow-hidden rounded-2xl">
                <div className="relative h-56 w-full">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-primary-50 p-3 rounded-xl"
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-primary-800">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-base mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  <motion.a
                    href={service.link}
                    className="text-primary-700 text-base font-medium inline-flex items-center hover:text-primary-800 transition-colors mt-auto group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    aria-label={`Learn more about ${service.title}`}
                  >
                    {t('services.learnMore')} 
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </motion.a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="primary"
            onClick={() => (window.location.href = '/services')}
            className="hover:scale-105 transition-transform duration-300 text-lg px-8 py-3"
          >
            {t('services.viewAll')}
          </Button>
        </motion.div>
      </Section>

      {/* About Preview */}
      <Section background="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Team members collaborating at OryFolks"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-transparent rounded-2xl"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6 tracking-tight">
              Who We Are
            </h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Founded in 2025, OryFolks has grown into a leading organization
              dedicated to driving positive change through innovative solutions
              and community-centered approaches.
            </p>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Our team of dedicated professionals brings diverse expertise to
              every project, ensuring comprehensive solutions that address
              complex challenges and create lasting impact.
            </p>
            <Button
              variant="primary"
              onClick={() => (window.location.href = '/about')}
              className="flex items-center hover:scale-105 transition-transform duration-300 text-lg px-8 py-3"
              aria-label="Learn about our journey"
            >
              Learn About Our Journey <ArrowRight size={20} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Careers Section */}
      <Section background="light">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-10"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-800 mb-3 md:mb-4 tracking-tight">
                Careers at OryFolks
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We invite you to supercharge your potential. Find what inspires and drives you. Find your spark.
              </p>
            </motion.div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  icon: <Users className="text-primary-600" size={28} />,
                  title: t('careers.roles.engineer.title'),
                  type: t('careers.roles.engineer.type'),
                  description: "Join our engineering team to build innovative solutions and work with cutting-edge technologies."
                },
                {
                  icon: <Calendar className="text-primary-600" size={28} />,
                  title: t('careers.roles.hr.title'),
                  type: t('careers.roles.hr.type'),
                  description: "Help shape our company culture and support our growing team with your HR expertise."
                },
                {
                  icon: <BarChart3 className="text-primary-600" size={28} />,
                  title: t('careers.roles.receptionist.title'),
                  type: t('careers.roles.receptionist.type'),
                  description: "Be the first point of contact and create a welcoming environment for our team and visitors."
                },
              ].map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 h-full flex flex-col border border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="bg-primary-50 p-2 md:p-3 rounded-lg md:rounded-xl group-hover:bg-primary-100 transition-colors duration-300">
                        {role.icon}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-primary-800">
                          {role.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500">{role.type}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-4 md:mb-6 flex-grow leading-relaxed">
                      {role.description}
                    </p>

                    <motion.a
                      href="/careers"
                      className="text-primary-700 text-sm md:text-base font-medium inline-flex items-center hover:text-primary-800 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      aria-label={`Apply for ${role.title} role`}
                    >
                      {t('careers.applyNow')}
                      <ArrowRight size={14} className="ml-2" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-6 md:mt-8"
            >
              <Button
                variant="primary"
                onClick={() => (window.location.href = '/careers')}
                className="hover:scale-105 transition-transform duration-300 text-base md:text-lg px-6 md:px-8 py-2 md:py-3"
              >
                {t('careers.viewAll')}
              </Button>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Partners Section */}
      <Section background="white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-800 mb-3 md:mb-4 tracking-tight">Our Global Partners</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We have established exclusive global partnerships to expand our business reach and deliver comprehensive solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                logo: "/ideal-1.png",
                title: "Ideal Folks",
                description: "A leading provider of end-to-end IT services and executive search for Global companies, with a primary focus on Japan.",
                link: "https://www.idealfolks.com/"
              },
              {
                logo: "/icro_a.png",
                title: "iCRO",
                description: "A division of Ideal Folks LLC and its Tokyo-based Clinical Research Partner that provides Clinical Research services in APAC.",
                link: "https://www.icro.com"
              },
              {
                logo: "/shinka_a.png",
                title: "Shinka",
                description: "A world-class IT consulting, services, and solution provider that combines business processing experience with innovative technologies.",
                link: "https://shinkas.com/"
              },
              {
                logo: "/shigoto.png",
                title: "Shigoto",
                description: "A leading consultancy service provider delivering innovative tech solutions and helping businesses express their vision effectively.",
                link: "https://www.shigoto.io/partners/"
              }
            ].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 hover:border-primary-200 hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex flex-col items-center text-center flex-grow">
                  <div className="mb-4 md:mb-6 h-20 md:h-24 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.title} logo`}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-primary-800 mb-2 md:mb-3">{partner.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 flex-grow leading-relaxed">{partner.description}</p>
                  <div className="w-full mt-auto">
                    <Button
                      variant="outline"
                      onClick={() => window.open(partner.link, '_blank')}
                      className="w-full hover:scale-105 transition-transform duration-300 text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section background="primary" className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => (window.location.href = '/contact')}
              className="hover:scale-105 transition-transform duration-300 text-lg px-8 py-3"
            >
              {t('cta.contact')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-800 hover:scale-105 transition-all duration-300 text-lg px-8 py-3"
              onClick={() => (window.location.href = '/services')}
            >
              {t('cta.explore')}
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  );
};

export default HomePage;
