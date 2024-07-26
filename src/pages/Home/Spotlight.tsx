
const Spotlight = () => {
  return (
    <div className="h-full text-foreground bg-background rounded-t-3xl">
      <div className="container mx-auto py-10">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="text-3xl md:text-5xl font-light mb-2">
              Gear Spotlight
            </h1>
            <div className="h-1 w-20 bg-secondary-foreground rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-xl font-light">
            Explore our Gear Spotlight, where every 10 seconds we showcase new
            top-rated camping accessories. Discover quality gear to enhance your
            adventures. Don’t miss out
            <span className="ml-2 bg-accent-foreground text-background animate-pulse rounded px-2">
              - find your next must-have item today!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;