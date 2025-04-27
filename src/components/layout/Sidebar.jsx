import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CalculatorIcon, 
  DocumentCheckIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(true);
  
  return (
    <aside className="hidden md:flex flex-col bg-gray-800 text-white w-64 min-h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Menu Navigasi</h2>
      </div>
      
      <nav className="flex-1">
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 ${isActive ? 'bg-blue-700' : 'hover:bg-gray-700'}`
              }
              end
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              <span>Beranda</span>
            </NavLink>
          </li>

          <li>
            <button 
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700" 
              onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
            >
              <div className="flex items-center">
                <CalculatorIcon className="h-5 w-5 mr-3" />
                <span>Perhitungan Pajak</span>
              </div>
              {isCalculatorOpen ? 
                <ChevronDownIcon className="h-4 w-4" /> : 
                <ChevronRightIcon className="h-4 w-4" />
              }
            </button>

            {isCalculatorOpen && (
              <ul className="bg-gray-900 pl-6">
                <li>
                  <NavLink 
                    to="/pph-final" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`
                    }
                  >
                    <span>PPh Final UMKM (0,3%)</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/pph-21" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`
                    }
                  >
                    <span>PPh Pasal 21</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/pph-22" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`
                    }
                  >
                    <span>PPh Pasal 22</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/pph-23" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`
                    }
                  >
                    <span>PPh Pasal 23</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/pph-4-2" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`
                    }
                  >
                    <span>PPh Pasal 4 ayat (2)</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/pph-25" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`
                    }
                  >
                    <span>PPh Pasal 25</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/ppn" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`
                    }
                  >
                    <span>PPN</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/pph-24" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 ${isActive ? 'text-blue-400' : 'hover:text-blue-300'}`
                    }
                  >
                    <span>PPh Pasal 24</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink 
              to="/npwp-validator" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 ${isActive ? 'bg-blue-700' : 'hover:bg-gray-700'}`
              }
            >
              <DocumentCheckIcon className="h-5 w-5 mr-3" />
              <span>Validasi NPWP</span>
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 ${isActive ? 'bg-blue-700' : 'hover:bg-gray-700'}`
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Tentang</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}