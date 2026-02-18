import { useState } from 'react'
import Signin from './pages/Signin.jsx';
import Login from './pages/Login.jsx';

import { Routes,Route,Navigate } from 'react-router-dom';

function App() {

  return (
   <Routes>
     {/* Default page */}
      <Route path="/" element={<Navigate to="/Signin" />} />

      {/* Pages */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Signin" element={<Signin />} />
   </Routes>
  )
}

export default App
