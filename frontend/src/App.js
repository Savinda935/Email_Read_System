import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoardHome from './pages/DashBoard_Home';
import Sidebar from './components/sidebar';
import AddEmailAndExtract from './pages/AddEmailAndExtract';
import ViewExtractedData from './pages/ViewExtractedData';


function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: '100%' }}>
        <Routes>
          <Route path="/" element={<DashBoardHome />} />
          <Route path="/inbox" element={<DashBoardHome />} />
          <Route path="/addemail" element={<AddEmailAndExtract />} />
          <Route path="/extractdata" element={<ViewExtractedData />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;