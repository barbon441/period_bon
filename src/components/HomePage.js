import React, { useState, useContext } from 'react';
import { CycleContext } from './CycleContext';

const HomePage = () => {
  const { cycleData } = useContext(CycleContext);
  const nextPeriod = cycleData?.nextPeriodDate || 'ประมาณ 9 วัน'; // ใช้ข้อมูลจาก Context หรือใช้ค่าเริ่มต้น
  const [showSymptomForm, setShowSymptomForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState({
    flow: '',
    mood: '',
    symptoms: [],
  });
  const [summary, setSummary] = useState(null);

  const handleSymptomChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'symptoms') {
      if (checked) {
        setSelectedSymptoms({
          ...selectedSymptoms,
          symptoms: [...selectedSymptoms.symptoms, value],
        });
      } else {
        setSelectedSymptoms({
          ...selectedSymptoms,
          symptoms: selectedSymptoms.symptoms.filter((symptom) => symptom !== value),
        });
      }
    } else {
      setSelectedSymptoms({
        ...selectedSymptoms,
        [name]: value,
      });
    }
  };

  const handleLogSymptoms = () => {
    setShowSymptomForm(true);
  };

  const handleSaveSymptoms = () => {
    setSummary(selectedSymptoms);
    setSelectedSymptoms({
      flow: '',
      mood: '',
      symptoms: [],
    });
    setShowSymptomForm(false);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl">10 ตุลาคม</div>
        <div className="text-xl">ไอคอนเมนู/ปุ่มอื่น ๆ</div>
      </div>

      {/* Calendar Section */}
      <div className="mt-5">
        <div className="text-center text-lg font-bold">ประจำเดือนจะมาใน</div>
        <div className="text-center text-6xl font-bold text-pink-500">{nextPeriod}</div>
        <div className="text-center text-sm mt-2">โอกาสตั้งครรภ์น้อย</div>
      </div>

    

      {/* Additional Information */}
      <div className="mt-10">
        <div className="text-lg font-bold">ข้อมูลเชิงลึกประจำวันของฉัน - วันนี้</div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {/* บันทึกอาการ */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>บันทึกอาการของคุณ</div>
              <div
                className="bg-pink-500 text-white rounded-full p-2 cursor-pointer"
                onClick={handleLogSymptoms}
              >
                +
              </div>
            </div>
          </div>

          {/* ข้อมูลเชิงลึก */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div>ข้อมูลเชิงลึกเฉพาะบุคคลสำหรับวันนี้</div>
          </div>
        </div>
      </div>

      {/* Show symptom selection form */}
      {showSymptomForm && (
        <div className="mt-5">
          <h3 className="text-lg font-bold">เลือกอาการที่คุณรู้สึก</h3>

          {/* หมวดหมู่ 1: ปริมาณประจำเดือน */}
          <div className="mt-4">
            <h4 className="font-bold">ปริมาณประจำเดือน</h4>
            <label className="block mt-2">
              <input
                type="radio"
                name="flow"
                value="มามาก"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              มามาก
            </label>
            <label className="block mt-2">
              <input
                type="radio"
                name="flow"
                value="มาปานกลาง"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              มาปานกลาง
            </label>
            <label className="block mt-2">
              <input
                type="radio"
                name="flow"
                value="มาน้อย"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              มาน้อย
            </label>
          </div>

       {/* หมวดหมู่ 2: อารมณ์ */}
       <div className="mt-4">
            <h4 className="font-bold">อารมณ์</h4>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="เงียบสงบ"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              เงียบสงบ
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="มีความสุข"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              มีความสุข
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="กระปรี้กระเปร่า"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              กระปรี้กระเปร่า
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="กระปรี้กระเปร่า"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              หงุดหงิด
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="กระปรี้กระเปร่า"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              เศร้า
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="กระปรี้กระเปร่า"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              กระวนกระวาย
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="กระปรี้กระเปร่า"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              หดหู่
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="กระปรี้กระเปร่า"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              รู้สึกผิด
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="กระปรี้กระเปร่า"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              ไม่กระตือรือร้น
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="กระปรี้กระเปร่า"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              สับสน
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="กระปรี้กระเปร่า"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              วิจารณ์ตัวเอง
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="mood"
                value="อารมณ์แปรปรวน"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              อารมณ์แปรปรวน
            </label>
          </div>

          {/* หมวดหมู่ 3: อาการ */}
          <div className="mt-4">
            <h4 className="font-bold">อาการ</h4>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="symptoms"
                value="ปวดประจำเดือน"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              ปกติทุกอย่าง
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="symptoms"
                value="เจ็บเต้านม"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              ปวดท้องประจำเดือน
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="symptoms"
                value="เจ็บเต้านม"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              เจ็บเต้านม
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="symptoms"
                value="ปวดศีรษะ"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              ปวดศีรษะ
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="symptoms"
                value="อ่อนเพลีย"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              เป็นสิว
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="symptoms"
                value="อ่อนเพลีย"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              ปวดหลัง
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="symptoms"
                value="อ่อนเพลีย"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              อ่อนเพลีย
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="symptoms"
                value="อ่อนเพลีย"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              มีความอยากอาหารสูง
            </label>
            <label className="block mt-2">
              <input
                type="checkbox"
                name="symptoms"
                value="อ่อนเพลีย"
                onChange={handleSymptomChange}
                className="mr-2"
              />
              นอนไม่หลับ
            </label>
          </div>

          <button className="bg-pink-500 text-white py-2 px-4 rounded-full" onClick={handleSaveSymptoms}>
            บันทึกอาการ
          </button>
        </div>
      )}


      {/* Summary */}
      {summary && (
        <div className="mt-10 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold">สรุปอาการของคุณ</h3>
          <p className="mt-2">ปริมาณประจำเดือน: {summary.flow || 'ไม่ได้ระบุ'}</p>
          <p className="mt-2">อารมณ์: {summary.mood || 'ไม่ได้ระบุ'}</p>
          <p className="mt-2">
            อาการ: {summary.symptoms.length > 0 ? summary.symptoms.join(', ') : 'ไม่ได้ระบุ'}
          </p>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">บันทึกอาการของคุณแล้ว</h3>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <div className="fixed bottom-0 w-full bg-white p-4 flex justify-between items-center shadow-md">
        {/* ส่วนปุ่มนำทางที่ด้านล่าง */}
        <div className="flex flex-col items-center">
          <div>📅</div>
          <div>วันนี้</div>
        </div>
        <div className="flex flex-col items-center">
          <div>📊</div>
          <div>ข้อมูลเชิงลึก</div>
        </div>
        <div className="flex flex-col items-center">
          <div>💬</div>
          <div>ข้อความ</div>
        </div>
        <div className="flex flex-col items-center">
          <div>👫</div>
          <div>คู่รัก</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
