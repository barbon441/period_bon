import React, { createContext, useState } from 'react';

export const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [cycleData, setCycleData] = useState({
    startDate: null,
    periodDay: 1,  // เพิ่มตัวแปร periodDay เพื่อติดตามวันที่เป็นประจำเดือน
  });

  return (
    <CycleContext.Provider value={{ cycleData, setCycleData }}>
      {children}
    </CycleContext.Provider>
  );
};
