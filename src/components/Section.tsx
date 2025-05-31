import React from 'react';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'primary' | 'secondary' | 'dark';
  paddingSize?: 'normal' | 'small' | 'none';
};

const Section = ({
  children,
  className = '',
  id,
  background = 'white',
  paddingSize = 'normal',
}: SectionProps) => {
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    primary: 'bg-gradient-to-br from-primary-800 to-primary-900 text-white',
    secondary: 'bg-gradient-to-br from-secondary-50 to-secondary-100',
    dark: 'bg-gradient-to-br from-primary-900 to-primary-950 text-white',
  };

  const paddingClasses = {
    normal: 'py-12 md:py-16',
    small: 'py-6 md:py-8',
    none: 'py-0',
  };

  return (
    <section
      id={id}
      className={`${paddingClasses[paddingSize]} ${backgroundClasses[background]} ${className}`}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
};

export default Section;