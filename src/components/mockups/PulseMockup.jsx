import { FiActivity, FiUsers, FiCalendar, FiSettings, FiBell, FiHome, FiBarChart2, FiClock, FiChevronDown, FiMoreHorizontal } from 'react-icons/fi';

const PulseMockup = () => {
  return (
    <div className="w-full h-full bg-gray-900 p-6 flex gap-4 overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 bg-gray-800 rounded-xl p-3 flex flex-col items-center gap-6">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
          <FiActivity className="w-4 h-4 text-white" />
        </div>
        <FiHome className="w-5 h-5 text-green-500" />
        <FiBarChart2 className="w-5 h-5 text-gray-500" />
        <FiUsers className="w-5 h-5 text-gray-500" />
        <FiCalendar className="w-5 h-5 text-gray-500" />
        <FiSettings className="w-5 h-5 text-gray-500 mt-auto" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Top bar */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-white font-semibold">Dashboard</h3>
            <p className="text-gray-500 text-xs">Welcome back, John</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <FiBell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FiUsers className="w-4 h-4 text-green-500" />
              </div>
              <FiMoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-white font-bold text-2xl">1,482</p>
            <p className="text-gray-500 text-xs mt-1">Total Members</p>
            <p className="text-green-500 text-xs mt-2">↑ 12.5% this month</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FiActivity className="w-4 h-4 text-blue-500" />
              </div>
              <FiMoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-white font-bold text-2xl">892</p>
            <p className="text-gray-500 text-xs mt-1">Active Today</p>
            <p className="text-blue-500 text-xs mt-2">↑ 8.2% this month</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <FiClock className="w-4 h-4 text-yellow-500" />
              </div>
              <FiMoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-white font-bold text-2xl">$24.5k</p>
            <p className="text-gray-500 text-xs mt-1">Revenue</p>
            <p className="text-yellow-500 text-xs mt-2">↑ 5.3% this month</p>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white text-sm font-medium">Member Growth</h4>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">Last 7 days</span>
              <FiChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="flex items-end gap-2 h-32">
            <div className="flex-1 bg-green-500/30 rounded-t" style={{ height: '40%' }}></div>
            <div className="flex-1 bg-green-500/50 rounded-t" style={{ height: '60%' }}></div>
            <div className="flex-1 bg-green-500/40 rounded-t" style={{ height: '50%' }}></div>
            <div className="flex-1 bg-green-500/70 rounded-t" style={{ height: '75%' }}></div>
            <div className="flex-1 bg-green-500/60 rounded-t" style={{ height: '65%' }}></div>
            <div className="flex-1 bg-green-500/80 rounded-t" style={{ height: '85%' }}></div>
            <div className="flex-1 bg-green-500 rounded-t" style={{ height: '95%' }}></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600 text-xs">Mon</span>
            <span className="text-gray-600 text-xs">Tue</span>
            <span className="text-gray-600 text-xs">Wed</span>
            <span className="text-gray-600 text-xs">Thu</span>
            <span className="text-gray-600 text-xs">Fri</span>
            <span className="text-gray-600 text-xs">Sat</span>
            <span className="text-gray-600 text-xs">Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseMockup;