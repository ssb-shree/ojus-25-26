'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Mock event data organized by day
// const scheduleData = {
//   'Day 1': [
//     {
//       id: 1,
//       title: 'Badminton Singles (M/F)',
//       banner: 'https://4kwallpapers.com/images/walls/thumbs/17420.jpg',
//       category: 'indoor'
//     },
//     {
//       id: 2,
//       title: 'Chess (Boys & Girls)',
//       banner: 'https://4kwallpapers.com/images/walls/thumbs/16674.jpg',
//       category: 'indoor'
//     }
//   ],
//   'Day 2': [
//     {
//       id: 3,
//       title: 'Badminton Doubles',
//       banner: 'https://imgs.search.brave.com/iGrUlKjcOUZztd8PcSPt96HYDOowpnm4D_W3lhKbnpU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY2/NzU3NTMwL3ZlY3Rv/ci9iYWRtaW50b24t/bWl4ZWQtZG91Ymxl/cy1iYWRtaW50b24t/cGxheWVycy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9b0dv/cW52bDlKUjNtZHRZ/Y3ZUMUZwMjZkdnRt/REtRUEJOQ2wxLW5a/ZHBYdz0',
//       category: 'indoor'
//     },
//     {
//       id: 4,
//       title: 'Carrom',
//       banner: 'https://www.parascarrom.com/images/banner3.png',
//       category: 'indoor'
//     },
//     {
//       id: 5,
//       title: 'Table Tennis',
//       banner: 'https://www.shutterstock.com/image-photo/hand-ping-pong-racket-hitting-260nw-1963053211.jpg',
//       category: 'indoor'
//     },
//     {
//       id: 9,
//       title: 'Dodgeball (Girls)',
//       banner: 'https://www.shutterstock.com/image-vector/colorful-vector-editable-dodgeball-player-600nw-2641795521.jpg',
//       category: 'outdoor'
//     }
//   ],
//   'Day 3': [
//     {
//       id: 10,
//       title: 'Overarm Cricket (Boys)',
//       banner: 'https://thumbs.dreamstime.com/b/dynamic-cricket-banner-bold-colors-action-graphics-high-energy-design-featuring-vivid-abstract-shapes-silhouettes-385109310.jpg',
//       category: 'outdoor'
//     },
//     {
//       id: 11,
//       title: 'Tug of War (Boys)',
//       banner: 'https://ichef.bbci.co.uk/news/480/cpsprodpb/61bf/live/ae15cb30-6170-11ef-9ad8-5bacd187043d.jpg.webp',
//       category: 'outdoor'
//     }
//   ],
//   'Day 4': [
//     {
//       id: 12,
//       title: 'Kabaddi (Boys & Girls)',
//       banner: 'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/q9tfseaumm3llmkwvp63',
//       category: 'outdoor'
//     },
//     {
//       id: 13,
//       title: 'Box Cricket (Both)',
//       banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMq6U5EUHZr6Dy_4nmpIWBknpRzvf42EslWw&s',
//       category: 'outdoor'
//     }
//   ],
//   'Day 5': [
//     {
//       id: 14,
//       title: 'Football (Boys)',
//       banner: 'https://www.shutterstock.com/shutterstock/videos/3515852867/thumb/1.jpg?ip=x480',
//       category: 'outdoor'
//     },
//     {
//       id: 15,
//       title: 'Volleyball (Boys)',
//       banner: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Brasil_vence_a_Fran%C3%A7a_no_v%C3%B4lei_masculino_1037987-15.08.2016_ffz-6369.jpg/1200px-Brasil_vence_a_Fran%C3%A7a_no_v%C3%B4lei_masculino_1037987-15.08.2016_ffz-6369.jpg',
//       category: 'outdoor'
//     },
//     {
//       id: 16,
//       title: 'Throwball (Girls)',
//       banner: 'https://imgs.search.brave.com/Wmay4JDoBi-ts23KqZYDv0C9zg5wSCqxDWiWtJFr11M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL1NPU1ZfVGhy/b3diYWxsLmpwZw',
//       category: 'outdoor'
//     },
//     {
//       id: 17,
//       title: 'Kho-kho (Girls)',
//       banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqxLHlqSxcyUoucBf9J8E5Wj_WMVUPCeGcNA&s',
//       category: 'outdoor'
//     }
//   ]
// };


const scheduleData = {
  'Day 1': [
    {
      id: 1,
      title: 'Badminton Singles (Boys)',
      banner: 'https://4kwallpapers.com/images/walls/thumbs/17420.jpg',
      category: 'indoor'
    },
    {
      id: 2,
      title: 'Badminton Singles (Girls)',
      banner: 'https://4kwallpapers.com/images/walls/thumbs/17420.jpg',
      category: 'indoor'
    },
    {
      id: 3,
      title: 'Badminton Doubles (Boys)',
      banner: 'https://imgs.search.brave.com/iGrUlKjcOUZztd8PcSPt96HYDOowpnm4D_W3lhKbnpU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY2/NzU3NTMwL3ZlY3Rv/ci9iYWRtaW50b24t/bWl4ZWQtZG91Ymxl/cy1iYWRtaW50b24t/cGxheWVycy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9b0dv/cW52bDlKUjNtZHRZ/Y3ZUMUZwMjZkdnRt/REtRUEJOQ2wxLW5a/ZHBYdz0',
      category: 'indoor'
    },
    {
      id: 4,
      title: 'Badminton Doubles (Girls)',
      banner: 'https://imgs.search.brave.com/iGrUlKjcOUZztd8PcSPt96HYDOowpnm4D_W3lhKbnpU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY2/NzU3NTMwL3ZlY3Rv/ci9iYWRtaW50b24t/bWl4ZWQtZG91Ymxl/cy1iYWRtaW50b24t/cGxheWVycy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9b0dv/cW52bDlKUjNtZHRZ/Y3ZUMUZwMjZkdnRt/REtRUEJOQ2wxLW5a/ZHBYdz0',
      category: 'indoor'
    },
    {
      id: 5,
      title: 'Carrom Singles (Boys)',
      banner: 'https://www.parascarrom.com/images/banner3.png',
      category: 'indoor'
    },
    {
      id: 6,
      title: 'Carrom Singles (Girls)',
      banner: 'https://www.parascarrom.com/images/banner3.png',
      category: 'indoor'
    },
    {
      id: 7,
      title: 'Carrom Doubles (Boys)',
      banner: 'https://www.parascarrom.com/images/banner3.png',
      category: 'indoor'
    },
    {
      id: 8,
      title: 'Carrom Doubles (Girls)',
      banner: 'https://www.parascarrom.com/images/banner3.png',
      category: 'indoor'
    },
    {
      id: 9,
      title: 'Chess (Boys)',
      banner: 'https://4kwallpapers.com/images/walls/thumbs/16674.jpg',
      category: 'indoor'
    },
    {
      id: 10,
      title: 'Chess (Girls)',
      banner: 'https://4kwallpapers.com/images/walls/thumbs/16674.jpg',
      category: 'indoor'
    }
  ],
  'Day 2': [
    {
      id: 11,
      title: 'Table Tennis Singles (Boys)',
      banner: 'https://www.shutterstock.com/image-photo/hand-ping-pong-racket-hitting-260nw-1963053211.jpg',
      category: 'indoor'
    },
    {
      id: 12,
      title: 'Table Tennis Singles (Girls)',
      banner: 'https://www.shutterstock.com/image-photo/hand-ping-pong-racket-hitting-260nw-1963053211.jpg',
      category: 'indoor'
    },
    {
      id: 13,
      title: 'Table Tennis Doubles (Boys)',
      banner: 'https://www.shutterstock.com/image-photo/hand-ping-pong-racket-hitting-260nw-1963053211.jpg',
      category: 'indoor'
    },
    {
      id: 14,
      title: 'Table Tennis Doubles (Girls)',
      banner: 'https://www.shutterstock.com/image-photo/hand-ping-pong-racket-hitting-260nw-1963053211.jpg',
      category: 'indoor'
    }
  ],
  'Day 3': [],
  'Day 4': [
    {
      id: 15,
      title: 'Box Cricket (Boys)',
      banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMq6U5EUHZr6Dy_4nmpIWBknpRzvf42EslWw&s',
      category: 'indoor'
    },
    {
      id: 16,
      title: 'Box Cricket (Girls)',
      banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMq6U5EUHZr6Dy_4nmpIWBknpRzvf42EslWw&s',
      category: 'indoor'
    }
  ],
  'Day 5': []
};





export default function SportsDashboardPage() {
  const [activeTab, setActiveTab] = useState('Day 1');
  const [searchQuery, setSearchQuery] = useState('');
  const tabs = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
  
  // Flatten all events for searching
  const allEvents = useMemo(() => {
    const events = [];
    for (const day in scheduleData) {
      events.push(...scheduleData[day]);
    }
    return events;
  }, []);

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) {
      return scheduleData[activeTab] || [];
    }
    
    const query = searchQuery.toLowerCase().trim();
    return allEvents.filter(event => 
      event.title.toLowerCase().includes(query)
    );
  }, [searchQuery, activeTab, allEvents]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white p-0 m-0 w-screen overflow-x-hidden">
      {/* Main Container */}
      <div className="w-screen p-4 md:p-8">
        {/* Back Button */}
        <div className="">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-300 font-medium text-lg"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>

        {/* Sticky Header Section - All three components together */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 mb-8">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center p-6 w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 mb-4 md:mb-0 text-center md:text-left">
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-black">
                  Welcome, SportsFan92
                </h1>
                <a 
                  href="/sports/outdoor" 
                  className="text-lg md:text-xl font-semibold hover:underline transition-all duration-300 flex items-center justify-center md:justify-start gap-2 text-gray-600"
                >
                  <span>checkout outdoor sports?</span>
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Logo Placeholder */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-black flex items-center justify-center bg-gray-100">
              <div className="text-3xl md:text-4xl font-black text-black">
                S
              </div>
            </div>
          </header>

          {/* Search Bar */}
          <div className="w-full px-6 pb-6">
            <div className="relative w-full">
              <div className="flex items-center p-3 rounded-lg border-2 border-gray-300 w-full">
                <svg 
                  className="absolute left-6 w-7 h-7 z-10 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for a single sport..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-16 pr-14 py-5 bg-white text-black rounded-lg focus:outline-none text-lg font-medium placeholder-gray-400 focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-6 w-7 h-7 z-10 text-gray-400 hover:text-gray-600"
                  >
                    <svg 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-600">
                  Found {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </p>
              )}
            </div>
          </div>

          {/* Tabs - Only show when not searching */}
          {!searchQuery && (
            <div className="w-full px-6 pb-6">
              <div className="flex space-x-1 md:space-x-4 bg-gray-100 p-2 rounded-lg w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-8 py-4 text-lg font-bold rounded-lg transition-all duration-300 w-full ${activeTab === tab ? 'bg-black text-white' : 'bg-white text-black border border-gray-300 hover:bg-gray-50'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content - Events Grid */}
        <div className="mb-12 w-full">
          <div className="flex justify-between items-center mb-8 w-full">
            <h2 className="text-3xl font-black tracking-tight text-black">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${activeTab} Events Schedule`}
            </h2>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="text-sm font-medium text-gray-600 hover:text-black"
              >
                Clear search
              </button>
            )}
          </div>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-300 transition-all duration-300 hover:shadow-lg w-full"
                >
                  {/* Event Banner Image */}
                  <div className="w-full h-64 relative overflow-hidden">
                    <img 
                      src={event.banner} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-black tracking-tight text-black mb-2">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <button 
                        className="px-6 py-4 my-3 w-150 rounded-lg font-bold text-white bg-black hover:bg-gray-800 transition-all duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏟️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No events found
              </h3>
              <p className="text-gray-500">
                {searchQuery 
                  ? `No events found for "${searchQuery}". Try a different search term.`
                  : `No events available for ${activeTab}.`
                }
              </p>
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="mt-4 px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}