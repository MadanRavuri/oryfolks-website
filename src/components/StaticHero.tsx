const StaticHero = () => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <img
        src="/homepage.webp"   // convert homepage.jpg → homepage.webp
        alt="Welcome to OryFolks"
        className="w-full h-full object-cover"
        loading="eager"
        decoding="async"
        width={1600}
        height={900}
        {...({ fetchpriority: 'high' } as any)}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Welcome to OryFolks
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Your trusted partner in bridging the technological gap between Japan and India.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaticHero;
