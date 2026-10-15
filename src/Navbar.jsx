import React from 'react';

export default function Navbar({ activeRole, setActiveRole, totalAppointments }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white font-bold p-2 rounded-lg shadow-md">
            VH
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">VHealth Diagnostics</h1>
            <p className="text-xs text-slate-500">Online Registration & Appointment System</p>
          </div>
        </div>

        {/* Navigation / Role Switcher */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveRole('patient')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeRole === 'patient'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Patient Portal
          </button>
          
          <button
            onClick={() => setActiveRole('staff')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
              activeRole === 'staff'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Staff Dashboard</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold">
              {totalAppointments}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}