import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';

const VideoSection = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedLoading) {
            setHasStartedLoading(true);
            if (videoRef.current) {
              // Start loading the video when it comes into view
              videoRef.current.load();
            }
          }
          
          if (entry.isIntersecting && isVideoLoaded) {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play().catch(e => {
                console.log('Autoplay prevented:', e);
              });
            }
          } else if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.3, rootMargin: '100px' } // Load earlier and trigger sooner
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [isVideoLoaded, hasStartedLoading]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleCanPlay = () => {
    if (videoRef.current && hasStartedLoading) {
      videoRef.current.play().catch(e => {
        console.log('Autoplay prevented:', e);
      });
    }
  };

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
        className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
      >
        {/* Loading placeholder */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading video...</p>
            </div>
          </div>
        )}
        
        <video
          ref={videoRef}
          controls
          className={`w-full rounded-2xl transition-opacity duration-300 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          preload="metadata"
          playsInline
          onLoadStart={() => console.log('Video loading started')}
          onLoadedData={handleVideoLoad}
          onCanPlay={handleCanPlay}
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

export default VideoSection;
