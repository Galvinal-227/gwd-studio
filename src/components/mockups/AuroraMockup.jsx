import { FiArrowRight, FiCheck, FiStar, FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';

const AuroraMockup = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 flex flex-col overflow-hidden">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-purple-700 font-bold text-sm">A</span>
          </div>
          <span className="text-white font-bold text-lg">Aurora</span>
        </div>
        <div className="hidden md:flex gap-6">
          <span className="text-white/80 text-xs font-medium cursor-pointer hover:text-white">Home</span>
          <span className="text-white/80 text-xs font-medium cursor-pointer hover:text-white">Services</span>
          <span className="text-white/80 text-xs font-medium cursor-pointer hover:text-white">Work</span>
          <span className="text-white/80 text-xs font-medium cursor-pointer hover:text-white">Contact</span>
        </div>
        <div className="px-4 py-2 bg-white rounded-md flex items-center gap-1 cursor-pointer hover:bg-purple-100">
          <span className="text-purple-700 text-xs font-semibold">Get Started</span>
          <FiArrowRight className="w-3 h-3 text-purple-700" />
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex items-center gap-8">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/30 rounded-full mb-4">
            <FiStar className="w-3 h-3 text-white" />
            <span className="text-white text-xs">Digital Marketing Agency</span>
          </div>
          <h2 className="text-white font-bold text-3xl leading-tight mb-3">
            We Create Digital<br />Experiences That<br />Drive Growth
          </h2>
          <p className="text-white/70 text-sm mb-6">
            Transforming brands with innovative solutions
          </p>
          <div className="flex gap-3">
            <div className="px-5 py-2.5 bg-white rounded-md flex items-center gap-2 cursor-pointer hover:bg-purple-100">
              <span className="text-purple-700 text-xs font-semibold">Start Project</span>
              <FiArrowRight className="w-3 h-3 text-purple-700" />
            </div>
            <div className="px-5 py-2.5 border border-white/30 rounded-md flex items-center gap-2 cursor-pointer hover:bg-white/10">
              <span className="text-white text-xs">View Work</span>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="w-48 h-48 bg-white/10 rounded-full relative flex items-center justify-center">
            <div className="absolute inset-4 bg-white/20 rounded-full"></div>
            <div className="absolute inset-8 bg-white/30 rounded-full"></div>
            <div className="absolute inset-12 bg-white rounded-full flex items-center justify-center">
              <FiTrendingUp className="w-12 h-12 text-purple-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white/10 backdrop-blur rounded-lg p-4 flex items-center gap-3">
          <FiUsers className="w-6 h-6 text-white" />
          <div>
            <p className="text-white font-bold text-xl">250+</p>
            <p className="text-white/60 text-xs">Projects Done</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-4 flex items-center gap-3">
          <FiCheck className="w-6 h-6 text-white" />
          <div>
            <p className="text-white font-bold text-xl">98%</p>
            <p className="text-white/60 text-xs">Satisfaction</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-4 flex items-center gap-3">
          <FiAward className="w-6 h-6 text-white" />
          <div>
            <p className="text-white font-bold text-xl">15</p>
            <p className="text-white/60 text-xs">Awards Won</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuroraMockup;