import { motion } from 'framer-motion';
import { Users, Briefcase, Globe, Target, Award, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Hero from '../../components/Hero';
import Section from '../../components/Section';
import Card from '../../components/Card';
import Button from '../../components/Button';

const ITStaffingPage = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Users className="text-primary-600" size={32} />,
      title: t('services.itStaffing.services.permanent.title'),
      description: t('services.itStaffing.services.permanent.description')
    },
    {
      icon: <Briefcase className="text-primary-600" size={32} />,
      title: t('services.itStaffing.services.contract.title'),
      description: t('services.itStaffing.services.contract.description')
    },
    {
      icon: <Globe className="text-primary-600" size={32} />,
      title: t('services.itStaffing.services.global.title'),
      description: t('services.itStaffing.services.global.description')
    }
  ];

  const benefits = [
    {
      icon: <Target className="text-primary-600" size={24} />,
      title: t('services.itStaffing.benefits.precisionMatching.title'),
      description: t('services.itStaffing.benefits.precisionMatching.description')
    },
    {
      icon: <Award className="text-primary-600" size={24} />,
      title: t('services.itStaffing.benefits.qualityAssurance.title'),
      description: t('services.itStaffing.benefits.qualityAssurance.description')
    },
    {
      icon: <Zap className="text-primary-600" size={24} />,
      title: t('services.itStaffing.benefits.quickTurnaround.title'),
      description: t('services.itStaffing.benefits.quickTurnaround.description')
    }
  ];

  return (
    <>
      <Hero
        title={t('services.itStaffing.hero.title')}
        subtitle={t('services.itStaffing.hero.subtitle')}
        image="/contactbased.jpg"
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
            {t('services.itStaffing.overview.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            {t('services.itStaffing.overview.description')}
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
              {t('services.itStaffing.benefits.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('services.itStaffing.benefits.description')}
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

      {/* Expertise Section */}
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
              {t('services.itStaffing.expertise.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('services.itStaffing.expertise.description')}
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
                {t('services.itStaffing.expertise.technicalRoles.title')}
              </h3>
              <ul className="space-y-4">
                {['developers', 'devops', 'dataScientists', 'cybersecurity'].map((key, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary-600">•</span>
                    <span>{t(`services.itStaffing.expertise.technicalRoles.items.${key}`)}</span>
                  </li>
                ))}
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
                {t('services.itStaffing.expertise.technologies.title')}
              </h3>
              <ul className="space-y-4">
                {['cloud', 'programming', 'ai', 'enterprise'].map((key, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary-600">•</span>
                    <span>{t(`services.itStaffing.expertise.technologies.items.${key}`)}</span>
                  </li>
                ))}
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
            {t('services.itStaffing.cta.title')}
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            {t('services.itStaffing.cta.description')}
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/contact'}
            className="hover:scale-105 transition-transform duration-300"
          >
            {t('services.itStaffing.cta.button')}
          </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default ITStaffingPage; 