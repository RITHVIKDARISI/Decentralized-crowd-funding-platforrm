import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, Payment, Withdraw, Logout } from './pages';
import { useTheme } from './context/ThemeContext';

const App = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`relative sm:-8 p-4 min-h-screen flex flex-row ${theme === 'dark' ? 'bg-[#13131a]' : 'bg-[#f5f5f5]'}`}>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  )
}

export default App