import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CycleContext } from './CycleContext';

const PeriodTracker = () => {
  const { cycleData, setCycleData } = useContext(CycleContext);
  const navigate = useNavigate();

  const [nextPeriodDates, setNextPeriodDates] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [markedDates, setMarkedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date(cycleData.startDate || new Date()).getMonth());
  const [currentYear, setCurrentYear] = useState(new Date(cycleData.startDate || new Date()).getFullYear());

  useEffect(() => {
    if (cycleData.startDate) {
      const startDate = new Date(cycleData.startDate);
      setCurrentMonth(startDate.getMonth());
      setCurrentYear(startDate.getFullYear());
    }
  }, [cycleData.startDate]);
  
  const handleDateClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    selectedDate.setHours(0, 0, 0, 0);
    
    // อัปเดตข้อมูลใน CycleContext ทันทีเมื่อเลือกวันที่
    setCycleData({
      ...cycleData,
      startDate: selectedDate.toISOString().split('T')[0],
    });
    
    // ตั้ง selectedDate ให้เท่ากับวันที่ที่เลือกเพื่อให้ตรงกับ CalendarHeader
    setIsSaved(false);
  };  
  
  
  

  const handleSave = () => {
    if (cycleData.startDate) {
      calculateNextPeriodDates();
      calculateMarkedDates();
  
      // คำนวณวันที่เป็นประจำเดือนวันแรก
      setCycleData({
        ...cycleData,
        periodDay: 1,
      });
  
      setIsSaved(true);
      navigate('/');
    } else {
      alert('กรุณาเลือกวันที่เริ่มประจำเดือนก่อนบันทึก');
    }
  };
  

  const calculateNextPeriodDates = () => {
    const startDate = new Date(cycleData.startDate);
    const nextPeriodDatesArray = [];
    for (let i = 1; i <= 4; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      nextPeriodDatesArray.push(date.toISOString().split('T')[0]);
    }
    setNextPeriodDates(nextPeriodDatesArray);
  };
  
  const calculateMarkedDates = () => {
    const startDate = new Date(cycleData.startDate);
    const markedDatesArray = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      markedDatesArray.push(date.toISOString().split('T')[0]);
    }
    setMarkedDates(markedDatesArray);
  };
  
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">บันทึกรอบประจำเดือน</h2>
      <div className="mt-4 flex justify-between items-center">
        <button onClick={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)} className="p-2">
          &lt;
        </button>
        <h3 className="text-xl font-bold">
          {new Date(currentYear, currentMonth).toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)} className="p-2">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 mt-4">
        {[...Array(new Date(currentYear, currentMonth + 1, 0).getDate()).keys()].map((day) => {
          const date = new Date(currentYear, currentMonth, day + 1);
          date.setHours(0, 0, 0, 0);
          const formattedDate = date.toISOString().split('T')[0];
          const isMarked = markedDates.includes(formattedDate);
          const isDashed = nextPeriodDates.includes(formattedDate);

          return (
            <div
              key={day}
              className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
                ${formattedDate === cycleData.startDate ? 'bg-pink-500 text-white' : isDashed ? 'border-2 border-dashed border-pink-500' : 'bg-gray-200 text-black'}`}
              onClick={() => handleDateClick(day + 1)}
            >
              {day + 1}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <button className="bg-pink-500 text-white p-2 rounded-full" onClick={handleSave}>
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default PeriodTracker;
