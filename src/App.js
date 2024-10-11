import React, { useState } from 'react';
import Header from './components/Header';  // นำเข้า Header ที่เราสร้างขึ้นมา
import PeriodTracker from './components/PeriodTracker';
import HomePage from './components/HomePage';
import './App.css';
import CalendarHeader from './components/CalendarHeader';
import { CycleProvider } from './components/CycleContext';
import { BrowserRouter as Router } from 'react-router-dom'; // นำเข้า BrowserRouter

function App() {
  const [showPeriodTracker, setShowPeriodTracker] = useState(false);

  const handleLogPeriod = () => {
    setShowPeriodTracker(true);
  };

  return (
    <Router>
      <CycleProvider>
        <div className="container mx-auto">
          {/* แสดงส่วน Header ที่มีการเลือกวันเฉพาะในหน้า HomePage */}
          <Header />
          {!showPeriodTracker && <CalendarHeader />}

          <h1 className="text-3xl font-bold text-center mt-5">Period Tracker</h1>

          {!showPeriodTracker && <HomePage />}
          {showPeriodTracker && <PeriodTracker />}

          {!showPeriodTracker && (
            <div className="mt-5 flex justify-center">
              <button
                className="bg-pink-500 text-white py-2 px-4 rounded-full"
                onClick={handleLogPeriod}
              >
                บันทึกรอบประจำเดือน
              </button>
            </div>
          )}
        </div>
      </CycleProvider>
    </Router>
  );
}


export default App;
