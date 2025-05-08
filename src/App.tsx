import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import AddPatientForm from './components/AddPatientForm'
import PatientDetails from './components/PatientDetails'
import { Patient } from './types'
import { useState, useEffect } from 'react'
import EditPatientForm from './components/EditPatientForm';
import AddDeviceForm from './components/AddDeviceForm';
import AddReadingForm from './components/AddReadingForm';

export default function App() {


  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-patient" element={<AddPatientForm />} />
        <Route path="/patients/:id" element={<PatientDetails /> }/>
        <Route path="/edit-patient/:id" element={<EditPatientForm />} />
        <Route path="add-device/:id" element={<AddDeviceForm />} />
        <Route path="/patients/:id/add-reading/:id/:deviceId" element={<AddReadingForm />} />
      </Routes>
    </BrowserRouter>
  )

};
