import { motion } from 'framer-motion';

const VideoSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <motion.div
        className="max-w-5xl mx-auto text-center px-6 md:px-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
          Learn More About Our Mission
        </h2>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
          Watch our story and see how we empower communities through innovation.
        </p>
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg mx-auto max-w-4xl">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="OryFolks Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;
