import { motion } from 'framer-motion';
import { Code, Brain, Bot, Shield, Zap, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Hero from '../../components/Hero';
import Section from '../../components/Section';
import Card from '../../components/Card';
import Button from '../../components/Button';

const BotVisionPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Code className="text-primary-600" size={32} />,
      title: t('services.botVision.features.buildOperateTransfer.title'),
      description: t('services.botVision.features.buildOperateTransfer.description')
    },
    {
      icon: <Brain className="text-primary-600" size={32} />,
      title: t('services.botVision.features.roboticVision.title'),
      description: t('services.botVision.features.roboticVision.description')
    },
    {
      icon: <Bot className="text-primary-600" size={32} />,
      title: t('services.botVision.features.aiAutomation.title'),
      description: t('services.botVision.features.aiAutomation.description')
    }
  ];

  const benefits = [
    {
      icon: <Shield className="text-primary-600" size={24} />,
      title: t('services.botVision.benefits.riskMitigation.title'),
      description: t('services.botVision.benefits.riskMitigation.description')
    },
    {
      icon: <Zap className="text-primary-600" size={24} />,
      title: t('services.botVision.benefits.acceleratedDevelopment.title'),
      description: t('services.botVision.benefits.acceleratedDevelopment.description')
    },
    {
      icon: <Users className="text-primary-600" size={24} />,
      title: t('services.botVision.benefits.accessToExpertise.title'),
      description: t('services.botVision.benefits.accessToExpertise.description')
    }
  ];

  return (
    <>
      <Hero
        title={t('services.botVision.hero.title')}
        subtitle={t('services.botVision.hero.subtitle')}
        image="/Bot.jpg"
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
            {t('services.botVision.overview.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            {t('services.botVision.overview.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
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
              {t('services.botVision.benefits.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('services.botVision.benefits.description')}
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

      {/* Technical Expertise Section */}
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
              {t('services.botVision.expertise.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('services.botVision.expertise.description')}
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
                {t('services.botVision.expertise.botModel.title')}
              </h3>
              <ul className="space-y-4">
                {['strategic', 'knowledge', 'quality', 'project'].map((key, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary-600">•</span>
                    <span>{t(`services.botVision.expertise.botModel.items.${key}`)}</span>
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
                {t('services.botVision.expertise.roboticVision.title')}
              </h3>
              <ul className="space-y-4">
                {['algorithm', 'machineLearning', 'sensor', 'realTime'].map((key, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary-600">•</span>
                    <span>{t(`services.botVision.expertise.roboticVision.items.${key}`)}</span>
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
            {t('services.botVision.cta.title')}
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            {t('services.botVision.cta.description')}
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/contact'}
            className="hover:scale-105 transition-transform duration-300"
          >
            {t('services.botVision.cta.button')}
          </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default BotVisionPage; 