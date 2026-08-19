const HeroMockup = () => {
  return (
    <div className="w-full h-full bg-white p-6 flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-lg font-bold">GWD<span className="text-gray-400">.</span></span>
        <div className="flex gap-3">
          <span className="w-10 h-2 bg-gray-200 rounded"></span>
          <span className="w-10 h-2 bg-gray-200 rounded"></span>
          <span className="w-10 h-2 bg-gray-200 rounded"></span>
        </div>
      </div>
      
      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-4/5 h-6 bg-black rounded mb-3"></div>
        <div className="w-3/5 h-6 bg-gray-300 rounded mb-2"></div>
        <div className="w-2/3 h-6 bg-gray-300 rounded mb-6"></div>
        <div className="w-3/4 h-3 bg-gray-200 rounded mb-2"></div>
        <div className="w-1/2 h-3 bg-gray-200 rounded mb-6"></div>
        <div className="flex gap-3">
          <div className="w-24 h-8 bg-black rounded"></div>
          <div className="w-24 h-8 border border-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;