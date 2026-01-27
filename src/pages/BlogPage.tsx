import { Calendar, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Section from '../components/Section';
import Button from '../components/Button';

const BlogPage = () => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const blogPosts = [
    {
      category: 'Business',
      date: 'May 15, 2025',
      title: 'Bridging Cultural Gaps in Indo-Japanese IT Collaboration',
      description:
        'Explore strategies for effective communication and collaboration between Indian and Japanese tech teams.',
      author: 'Akira Tanaka',
      image: '/blog1.webp',
      fullContent: `In today's globalized tech landscape, successful collaboration between Indian and Japanese IT teams has become increasingly crucial.

Key Points:
• Understanding cultural differences
• Hybrid communication styles
• Clear documentation

By applying these practices, organizations can significantly improve cross-border collaboration.`,
    },
    {
      category: 'Technology',
      date: 'April 28, 2025',
      title: 'The Future of AI Development in Cross-Cultural Teams',
      description:
        'How diverse perspectives drive innovation in artificial intelligence development across borders.',
      author: 'Priya Sharma',
      image: '/blog2.webp',
      fullContent: `Cross-cultural collaboration is reshaping AI development.

Key Advantages:
• Diverse datasets
• Ethical AI systems
• Cultural intelligence

The future of AI depends on inclusive, global teams.`,
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <Section background="primary" className="text-center">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-gray-100">
            Insights on technology, business, and cross-cultural collaboration.
          </p>
        </div>
      </Section>

      {/* ================= BLOG LIST ================= */}
      <Section background="white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                {/* IMAGE */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={1260}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-primary-600 text-white text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      {post.author}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-6">
                    {post.description}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedPost === index ? 'Show Less' : 'Read Article'}
                    <ChevronDown
                      size={16}
                      className={`ml-2 transition-transform ${
                        expandedPost === index ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>

                  {/* EXPANDED CONTENT (NO HEIGHT ANIMATION) */}
                  <AnimatePresence>
                    {expandedPost === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-6 pt-6 border-t border-gray-100"
                      >
                        <div className="prose prose-gray max-w-none">
                          {post.fullContent
                            .trim()
                            .split('\n')
                            .map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ================= NEWSLETTER ================= */}
          <div className="mt-16">
            <div className="bg-gray-50 rounded-xl p-8 max-w-3xl mx-auto text-center shadow-sm">
              <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
              <p className="text-gray-600 mb-6">
                Get the latest insights delivered to your inbox.
              </p>

              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  id="newsletter-email"
                  name="newsletter-email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500"
                />
                <Button variant="primary">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default BlogPage;
