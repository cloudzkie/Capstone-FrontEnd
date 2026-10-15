import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PatientPortal from './pages/PatientPortal';
import StaffDashboard from './pages/StaffDashboard';

export default function App() {
  const [activeRole, setActiveRole] = useState('patient');
  
  // Initial sample data
  const [appointments, setAppointments] = useState([
    {
      id: 'VHD-109283',
      fullName: 'Maria Santos',
      dob: '1992-05-14',
      gender: 'Female',
      contactNumber: '09198765432',
      email: 'mariasantos@example.com',
      selectedServices: ['s1', 's2'],
      appointmentDate: '2026-05-20',
      timeSlot: '09:00 AM - 10:00 AM',
      status: 'Confirmed'
    },
    {
      id: 'VHD-448192',
      fullName: 'Ramil Reyes',
      dob: '1985-11-23',
      gender: 'Male',
      contactNumber: '09223344556',
      email: 'ramilreyes@example.com',
      selectedServices: ['s4'],
      appointmentDate: '2026-05-21',
      timeSlot: '01:00 PM - 02:00 PM',
      status: 'Pending'
    }
  ]);

  const handleAddAppointment = (newApp) => {
    setAppointments([newApp, ...appointments]);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar 
        activeRole={activeRole} 
        setActiveRole={setActiveRole} 
        totalAppointments={appointments.length} 
      />

      <main>
        {activeRole === 'patient' ? (
          <PatientPortal 
            onAddAppointment={handleAddAppointment} 
            appointments={appointments} 
          />
        ) : (
          <StaffDashboard 
            appointments={appointments} 
            onUpdateStatus={handleUpdateStatus} 
          />
        )}
      </main>
    </div>
  );
}