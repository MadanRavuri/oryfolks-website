import { Calendar, User, ArrowRight, ChevronDown } from 'lucide-react';
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
      description: 'Explore strategies for effective communication and collaboration between Indian and Japanese tech teams.',
      author: 'Akira Tanaka',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullContent: `In today's globalized tech landscape, successful collaboration between Indian and Japanese IT teams has become increasingly crucial. This article explores the key strategies for bridging cultural gaps and fostering effective communication.

Key Points:
• Understanding Cultural Differences
- Japanese work culture emphasizes harmony and consensus
- Indian teams often value direct communication and quick decision-making
- Different approaches to hierarchy and authority

Communication Strategies:
1. Language and Translation
- Use of clear, simple English
- Implementation of bilingual documentation
- Regular language training sessions

2. Meeting Etiquette
- Respect for Japanese formal meeting protocols
- Adaptation of communication styles
- Use of visual aids and documentation

3. Project Management
- Hybrid approach combining both methodologies
- Clear documentation of decisions
- Regular check-ins and updates

Success Stories:
Several companies have successfully implemented these strategies, resulting in:
- 40% increase in project delivery efficiency
- 60% reduction in communication-related delays
- 85% improvement in team satisfaction scores

Best Practices:
• Regular cultural awareness training
• Mixed team events and activities
• Clear documentation of processes
• Regular feedback sessions

By implementing these strategies, teams can overcome cultural barriers and achieve successful collaboration in Indo-Japanese IT projects.`
    },
    {
      category: 'Technology',
      date: 'April 28, 2025',
      title: 'The Future of AI Development in Cross-Cultural Teams',
      description: 'How diverse perspectives drive innovation in artificial intelligence development across borders.',
      author: 'Priya Sharma',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      fullContent: `The intersection of artificial intelligence and cross-cultural collaboration is creating new opportunities for innovation. This article delves into how diverse teams are shaping the future of AI development.

Key Areas of Impact:
1. Algorithm Development
- Cultural bias detection and mitigation
- Multi-language processing capabilities
- Ethical considerations across cultures

2. Data Collection and Processing
- Diverse data sources
- Cultural context understanding
- Privacy considerations across regions

3. User Experience Design
- Cultural adaptation of interfaces
- Localization strategies
- Accessibility considerations

Innovation Drivers:
• Diverse problem-solving approaches
• Multiple cultural perspectives
• Varied technical backgrounds
• Different market insights

Case Studies:
1. Language Processing Projects
- Success rate increased by 45%
- Better handling of cultural nuances
- Improved accuracy in translations

2. AI Ethics Implementation
- More comprehensive ethical guidelines
- Better cultural sensitivity
- Improved global compliance

Future Trends:
• Increased focus on cultural AI
• Enhanced cross-border collaboration
• More diverse AI development teams
• Greater emphasis on ethical considerations

The future of AI development lies in leveraging the strengths of diverse teams to create more inclusive, effective, and culturally aware artificial intelligence solutions.`
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  return (
    <>
      <Section background="primary" className="text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Blog</h1>
            <p className="text-xl text-gray-100">
              Insights, perspectives, and stories from our team about technology, business, and cross-cultural collaboration.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section background="white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full mb-3">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {post.description}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors duration-300"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedPost === index ? 'Show Less' : 'Read Article'}
                    <ChevronDown 
                      size={16} 
                      className={`ml-2 transition-transform duration-300 ${
                        expandedPost === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </Button>

                  <AnimatePresence>
                    {expandedPost === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="prose prose-gray max-w-none">
                            {post.fullContent.split('\n\n').map((paragraph, i) => (
                              <p key={i} className="text-gray-600 mb-4">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-12">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Stay Updated
                </h2>
                <p className="text-gray-600">
                  Get the latest insights on technology and cross-cultural collaboration.
                </p>
              </div>
              
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Button 
                  variant="primary"
                  className="px-6 py-3"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default BlogPage; 