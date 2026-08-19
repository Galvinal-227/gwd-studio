import { FiCoffee, FiClock, FiUsers, FiStar, FiArrowRight, FiCalendar, FiMapPin, FiHeart, FiAward } from 'react-icons/fi';

const CulinaryMockup = () => {
  return (
    <div className="w-full h-full bg-orange-50 p-8 flex flex-col overflow-hidden">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FiCoffee className="w-6 h-6 text-orange-600" />
          <span className="text-lg font-bold text-gray-800">Culinary<span className="text-orange-500">.</span></span>
        </div>
        <div className="hidden md:flex gap-6">
          <span className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">Courses</span>
          <span className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">Chefs</span>
          <span className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">About</span>
          <span className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">Contact</span>
        </div>
        <div className="px-4 py-2 bg-orange-600 rounded-md cursor-pointer hover:bg-orange-700">
          <span className="text-white text-xs font-medium">Enroll Now</span>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 grid grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full mb-4 w-fit">
            <FiStar className="w-3 h-3 text-orange-600" />
            <span className="text-orange-600 text-xs">Top Rated Cooking School</span>
          </div>
          <h3 className="text-gray-800 font-bold text-2xl leading-tight mb-3">
            Master the Art<br />of Cooking
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Learn from world-class chefs
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-600">120+ Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUsers className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-600">500+ Students</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-6 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="bg-white/20 rounded-lg p-2">
              <FiCalendar className="w-5 h-5 text-white" />
            </div>
            <FiHeart className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white text-xs mb-1">Featured Course</p>
            <h4 className="text-white font-bold text-lg">French Cuisine Basics</h4>
            <p className="text-white/70 text-xs mt-1">Starting next week</p>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-orange-100">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
            <FiCoffee className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-sm font-semibold text-gray-800">Baking</p>
          <p className="text-xs text-gray-500 mt-1">30 courses</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-orange-100">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
            <FiClock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-sm font-semibold text-gray-800">Quick Meals</p>
          <p className="text-xs text-gray-500 mt-1">25 courses</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-orange-100">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
            <FiAward className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-sm font-semibold text-gray-800">Workshops</p>
          <p className="text-xs text-gray-500 mt-1">15 courses</p>
        </div>
      </div>
    </div>
  );
};

export default CulinaryMockup;