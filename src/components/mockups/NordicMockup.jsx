import { FiShoppingCart, FiHeart, FiSearch, FiStar, FiArrowRight, FiPlus } from 'react-icons/fi';

const NordicMockup = () => {
  return (
    <div className="w-full h-full bg-gray-50 p-8 flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-gray-500">Free shipping over $50</span>
        <div className="flex gap-4">
          <FiSearch className="w-4 h-4 text-gray-500 cursor-pointer" />
          <FiHeart className="w-4 h-4 text-gray-500 cursor-pointer" />
          <div className="relative">
            <FiShoppingCart className="w-4 h-4 text-gray-800 cursor-pointer" />
            <span className="absolute -top-2 -right-2 w-3 h-3 bg-gray-800 text-white text-[8px] rounded-full flex items-center justify-center">2</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-xl font-bold text-gray-800">NORDIC<span className="text-gray-400">.</span></span>
        <div className="hidden md:flex gap-6">
          <span className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">Living Room</span>
          <span className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">Bedroom</span>
          <span className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">Kitchen</span>
          <span className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">Office</span>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <p className="text-gray-400 text-xs mb-2">New Collection</p>
            <h3 className="text-white font-bold text-xl mb-2">Minimalist<br />Furniture</h3>
            <p className="text-gray-400 text-xs mb-4">Up to 40% off</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-white text-xs">Shop Now</span>
            <FiArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 flex flex-col justify-between border border-gray-100">
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Featured</p>
            <FiHeart className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full"></div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Scandinavian Chair</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <FiStar className="w-3 h-3 text-gray-300" />
              </div>
              <span className="text-sm font-bold text-gray-800">$299</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white rounded-lg p-3 border border-gray-100">
            <div className="w-full h-14 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
              <FiPlus className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-xs font-medium text-gray-800">Product {item}</p>
            <p className="text-xs text-gray-500 mt-1">$199</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NordicMockup;