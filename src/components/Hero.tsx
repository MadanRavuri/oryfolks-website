import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';

type HeroProps = {
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  overlay?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  onSubtitleClick?: () => void;
  onCtaClick?: () => void;
};

const Hero = ({
  title,
  subtitle,
  image,
  ctaText = 'Learn More',
  ctaLink = '/about',
  overlay = true,
  size = 'lg',
  children,
  onSubtitleClick,
  onCtaClick,
}: HeroProps) => {
  const heightClasses = {
    sm: 'min-h-[50vh]',
    md: 'min-h-[70vh]',
    lg: 'min-h-[90vh]',
  };

  return (
    <div
      className={`relative flex items-center justify-center ${heightClasses[size]} overflow-hidden`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-primary-900 bg-opacity-70"></div>
      )}
      
      <div className="container mx-auto px-4 relative z-10 text-center py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto ${onSubtitleClick ? 'cursor-pointer hover:text-white' : ''}`}
          onClick={onSubtitleClick}
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        )}
        
        {ctaText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="secondary"
              size="lg"
              className="group"
              onClick={onCtaClick || (() => window.location.href = ctaLink)}
            >
              {ctaText}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero;
