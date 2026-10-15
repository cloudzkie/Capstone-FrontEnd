import React, { useState } from 'react';

export default function StaffDashboard({ appointments, onUpdateStatus }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter(app => {
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || app.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase">Total Appointments</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{appointments.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-semibold text-amber-500 uppercase">Pending Review</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">{appointments.filter(a => a.status === 'Pending').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-semibold text-blue-500 uppercase">Confirmed</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{appointments.filter(a => a.status === 'Confirmed').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-semibold text-emerald-500 uppercase">Completed</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{appointments.filter(a => a.status === 'Completed').length}</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4 items-center">
          <h2 className="text-lg font-bold text-slate-800">Appointment Records</h2>
          
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search name or ref..."
              className="px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Ref ID</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Schedule</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">No appointments found.</td>
                </tr>
              ) : (
                filteredAppointments.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-blue-600">{app.id}</td>
                    <td className="p-4 font-semibold text-slate-800">{app.fullName}</td>
                    <td className="p-4 text-slate-600">{app.contactNumber}</td>
                    <td className="p-4 text-slate-600">{app.appointmentDate} <br/><span className="text-xs text-slate-400">{app.timeSlot}</span></td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        app.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        app.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {app.status === 'Pending' && (
                        <button onClick={() => onUpdateStatus(app.id, 'Confirmed')} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium">Confirm</button>
                      )}
                      {app.status === 'Confirmed' && (
                        <button onClick={() => onUpdateStatus(app.id, 'Completed')} className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-medium">Complete</button>
                      )}
                      {app.status !== 'Cancelled' && app.status !== 'Completed' && (
                        <button onClick={() => onUpdateStatus(app.id, 'Cancelled')} className="text-xs bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg font-medium">Cancel</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}