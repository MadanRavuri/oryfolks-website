import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

type EventType = 'all' | 'conference' | 'workshop' | 'webinar' | 'community';

const EventsPage = () => {
  const [filter, setFilter] = useState<EventType>('all');
  
  const events = [
    {
      id: 1,
      title: 'Annual Innovation Summit',
      type: 'conference',
      date: 'October 15-16, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'San Francisco, CA',
      image: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Join industry leaders and innovators for two days of inspiring keynotes, interactive workshops, and networking opportunities focused on emerging trends and innovative approaches to organizational and community challenges.',
      highlights: [
        'Keynote presentations from renowned speakers',
        'Interactive breakout sessions and workshops',
        'Networking opportunities with industry leaders',
        'Innovation showcase featuring cutting-edge solutions',
      ],
    },
    {
      id: 2,
      title: 'Community Leadership Workshop',
      type: 'workshop',
      date: 'November 5, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Chicago, IL',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'A hands-on workshop designed for community leaders and organizers looking to strengthen their leadership skills and develop effective strategies for community engagement and development.',
      highlights: [
        'Practical leadership skills and strategies',
        'Community engagement techniques',
        'Collaborative problem-solving exercises',
        'Action planning for community initiatives',
      ],
    },
    {
      id: 3,
      title: 'Digital Transformation Conference',
      type: 'conference',
      date: 'December 10-12, 2025',
      time: '9:00 AM - 4:00 PM',
      location: 'Virtual Event',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Explore the latest trends and best practices in digital transformation. This virtual conference brings together technology experts, business leaders, and change management specialists to share insights on successful digital initiatives.',
      highlights: [
        'Case studies of successful digital transformations',
        'Technology trends and future outlook',
        'Change management strategies for digital adoption',
        'Interactive Q&A sessions with experts',
      ],
    },
    {
      id: 4,
      title: 'Strategic Planning Webinar Series',
      type: 'webinar',
      date: 'January 15, 22, and 29, 2026',
      time: '11:00 AM - 12:30 PM',
      location: 'Virtual Event',
      image: 'https://images.pexels.com/photos/5673494/pexels-photo-5673494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'A three-part webinar series focused on effective strategic planning for organizations of all sizes. Each session will address different aspects of the planning process, from assessment to implementation.',
      highlights: [
        'Comprehensive approach to strategic planning',
        'Tools and templates for planning processes',
        'Implementation and monitoring strategies',
        'Expert Q&A and personalized feedback',
      ],
    },
    {
      id: 5,
      title: 'Community Health Forum',
      type: 'community',
      date: 'February 8, 2026',
      time: '10:00 AM - 3:00 PM',
      location: 'Atlanta, GA',
      image: 'https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'A collaborative forum bringing together healthcare providers, community organizations, and residents to address local health challenges and develop community-based solutions for improved health outcomes.',
      highlights: [
        'Panel discussions with healthcare experts',
        'Community voices and perspectives',
        'Collaborative solution development',
        'Resource sharing and networking',
      ],
    },
    {
      id: 6,
      title: 'Professional Development Workshop',
      type: 'workshop',
      date: 'March 15, 2026',
      time: '9:00 AM - 4:00 PM',
      location: 'Boston, MA',
      image: 'https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'An intensive one-day workshop designed to enhance professional skills in leadership, communication, and strategic thinking. Participants will engage in hands-on activities and receive personalized feedback.',
      highlights: [
        'Interactive skill-building exercises',
        'Personalized assessment and feedback',
        'Practical application strategies',
        'Ongoing support resources',
      ],
    },
  ];
  
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter);

  return (
    <>
      <Hero
        title="Events & Programs"
        subtitle="Join us for transformative events designed to inspire, educate, and connect."
        image="https://images.pexels.com/photos/2774546/pexels-photo-2774546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        size="md"
      />

      {/* Events Filter */}
      <Section background="white" className="pb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Upcoming Events</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our calendar of upcoming events and register to participate in person or virtually.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { value: 'all', label: 'All Events' },
              { value: 'conference', label: 'Conferences' },
              { value: 'workshop', label: 'Workshops' },
              { value: 'webinar', label: 'Webinars' },
              { value: 'community', label: 'Community Events' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as EventType)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === option.value
                    ? 'bg-primary-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Events List */}
      <Section background="white" className="pt-0">
        <div className="grid grid-cols-1 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                  <div className="h-64 md:h-auto">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-2 p-6">
                    <div className="mb-2">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-800">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-primary-800 mb-3">{event.title}</h3>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-secondary-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-secondary-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-secondary-500" />
                        {event.location}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    
                    <h4 className="font-medium text-primary-700 mb-2">Event Highlights:</h4>
                    <ul className="mb-6 space-y-1">
                      {event.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <ChevronRight size={16} className="text-secondary-500 mt-1 mr-1 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="primary"
                        onClick={() => window.open(`/event-registration?id=${event.id}`, '_blank')}
                      >
                        Register Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.open(`/event-details?id=${event.id}`, '_blank')}
                      >
                        Event Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Featured Event */}
      <Section background="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Annual Innovation Summit"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary-500 text-white mb-4 inline-block">
              Featured Event
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Annual Innovation Summit</h2>
            <p className="text-lg text-gray-700 mb-6">
              Our flagship event bringing together thought leaders, innovators, and change-makers for two days of inspiring presentations, interactive workshops, and valuable networking.
            </p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-gray-600">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2 text-secondary-500" />
                October 15-16, 2025
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-secondary-500" />
                San Francisco, CA
              </div>
              <div className="flex items-center">
                <Users size={18} className="mr-2 text-secondary-500" />
                Expected Attendance: 500+
              </div>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open('/event-registration?id=1', '_blank')}
              className="flex items-center"
            >
              Register Now <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Past Events */}
      <Section background="light">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Past Events</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore highlights and resources from our previous events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Leadership Conference 2024',
              date: 'April 2024',
              image: 'https://images.pexels.com/photos/1181421/pexels-photo-1181421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            },
            {
              title: 'Community Impact Forum',
              date: 'February 2024',
              image: 'https://images.pexels.com/photos/7688454/pexels-photo-7688454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            },
            {
              title: 'Strategic Planning Workshop',
              date: 'November 2023',
              image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            },
          ].map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.date}</p>
                  <a
                    href="#"
                    className="text-primary-700 font-medium inline-flex items-center hover:text-primary-800 transition-colors"
                  >
                    View Resources <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/event-archive'}
          >
            View All Past Events
          </Button>
        </div>
      </Section>

      {/* Host an Event */}
      <Section background="primary" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in Hosting an Event?</h2>
        <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
          Partner with OryFolks to host a customized workshop, training, or conference for your organization.
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => window.location.href = '/contact?subject=Event Inquiry'}
        >
          Contact Us About Custom Events
        </Button>
      </Section>
    </>
  );
};

export default EventsPage;