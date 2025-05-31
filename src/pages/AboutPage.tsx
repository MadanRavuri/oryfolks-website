import { Award, Heart, Star, UserCheck, TrendingUp, ArrowRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Button from '../components/Button';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Hero
        title={t('about')}
        subtitle="Discover our story, mission, and the values that drive our commitment to excellence and community impact."
        image="https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        size="md"
        onSubtitleClick={() => {
          const storySection = document.getElementById('our-story');
          if (storySection) {
            storySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        onCtaClick={() => {
          const valuesSection = document.getElementById('our-values');
          if (valuesSection) {
            valuesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />

      {/* Our Story */}
      <Section background="white" id="our-story">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">{t('story.title')}</h2>
            <p className="text-lg text-gray-700 mb-6">
              {t('story.description')}
            </p>
            <p className="text-lg text-gray-700 mb-6">
              {t('story.secondParagraph')}
            </p>
            <p className="text-lg text-gray-700 mb-6">
              {t('story.thirdParagraph')}
            </p>
          </div>
          <div className="order-first lg:order-last">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="OryFolks team"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </Section>

      {/* Mission and Vision */}
      <Section background="secondary" id="mission-vision">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-primary-800 mb-6 flex items-center">
              <Star className="text-primary-600 mr-3" size={28} />
              {t('mission.title')}
            </h3>
            {(t('mission.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
              <p key={index} className="text-gray-700 text-lg mb-4">
                {point}
              </p>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-primary-800 mb-6 flex items-center">
              <TrendingUp className="text-primary-600 mr-3" size={28} />
              {t('vision.title')}
            </h3>
            <p className="text-gray-700 text-lg">
              {t('vision.description')}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Our Values */}
      <Section background="white" id="our-values">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">{t('values.title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('values.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Users className="text-primary-600" size={40} />,
              title: t('values.items.oneTeam.title'),
              description: t('values.items.oneTeam.description'),
            },
            {
              icon: <TrendingUp className="text-primary-600" size={40} />,
              title: t('values.items.improvement.title'),
              description: t('values.items.improvement.description'),
            },
            {
              icon: <Star className="text-primary-600" size={40} />,
              title: t('values.items.transform.title'),
              description: t('values.items.transform.description'),
            },
            {
              icon: <Heart className="text-primary-600" size={40} />,
              title: t('values.items.inclusive.title'),
              description: t('values.items.inclusive.description'),
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="mb-6">{value.icon}</div>
              <h3 className="text-xl font-semibold text-primary-800 mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Leadership Team */}
      <Section background="light">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Our Leadership Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals guiding our organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Vijaylakshmi Mandalapu',
              title: 'Managing Director',
              image: '',
            },
            {
              name: 'Sreehita Manne',
              title: 'Executive Director',
              image: '',
            },
            {
              name: 'Praveen',
              title: 'Director',
              image: '',
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-64 bg-gray-50 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Photo Coming Soon</span>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold text-primary-800 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Join Our Team CTA */}
      <Section background="primary" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            We're always looking for talented, passionate individuals to join our growing team. Explore career opportunities at OryFolks.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/careers'}
            className="hover:scale-105 transition-transform duration-300"
          >
            View Open Positions
          </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default AboutPage;