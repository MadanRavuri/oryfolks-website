import { Award, Heart, Star, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Button from "../components/Button";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* ===== HERO (LCP SAFE) ===== */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* LCP IMAGE */}
        <img
          src="/about-hero.webp"
          alt="About OryFolks"
          className="absolute inset-0 w-full h-full object-cover"
          width={1400}
          height={900}
          loading="eager"
          {...({ fetchpriority: 'high' } as any)}
          decoding="async"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-900/70" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("about")}
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover our story, mission, and the values that drive our commitment
            to excellence and community impact.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              document
                .getElementById("our-story")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn Our Story
          </Button>
        </div>
      </div>

      {/* ===== OUR STORY ===== */}
      <Section background="white" id="our-story">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              {t("story.title")}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {t("story.description")}
            </p>
            <p className="text-lg text-gray-700 mb-6">
              {t("story.secondParagraph")}
            </p>
            <p className="text-lg text-gray-700 mb-6">
              {t("story.thirdParagraph")}
            </p>
          </div>

          <div className="order-first lg:order-last">
            <img
              src="/about-hero.webp"
              alt="OryFolks team"
              className="rounded-xl shadow-2xl w-full h-auto"
              width={1400}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Section>

      {/* ===== MISSION & VISION ===== */}
      <Section background="secondary" id="mission-vision">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-primary-800 mb-6 flex items-center">
              <Star className="text-primary-600 mr-3" size={28} />
              {t("mission.title")}
            </h3>
            {(t("mission.points", { returnObjects: true }) as string[]).map(
              (point, index) => (
                <p key={index} className="text-gray-700 text-lg mb-4">
                  {point}
                </p>
              )
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-primary-800 mb-6 flex items-center">
              <TrendingUp className="text-primary-600 mr-3" size={28} />
              {t("vision.title")}
            </h3>
            <p className="text-gray-700 text-lg">
              {t("vision.description")}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ===== VALUES ===== */}
      <Section background="white" id="our-values">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            {t("values.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("values.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Users className="text-primary-600" size={40} />,
              title: t("values.items.oneTeam.title"),
              description: t("values.items.oneTeam.description"),
            },
            {
              icon: <TrendingUp className="text-primary-600" size={40} />,
              title: t("values.items.improvement.title"),
              description: t("values.items.improvement.description"),
            },
            {
              icon: <Star className="text-primary-600" size={40} />,
              title: t("values.items.transform.title"),
              description: t("values.items.transform.description"),
            },
            {
              icon: <Heart className="text-primary-600" size={40} />,
              title: t("values.items.inclusive.title"),
              description: t("values.items.inclusive.description"),
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-xl border border-gray-100"
            >
              <div className="mb-6">{value.icon}</div>
              <h3 className="text-xl font-semibold text-primary-800 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <Section background="primary" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            We're always looking for talented, passionate individuals to join
            our growing team.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => (window.location.href = "/careers")}
          >
            View Open Positions
          </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default AboutPage;
