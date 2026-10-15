import React, { useState } from 'react';
import { DIAGNOSTIC_SERVICES, TIME_SLOTS } from '../data/servicesData';

export default function PatientPortal({ onAddAppointment, appointments }) {
  const [tab, setTab] = useState('book'); // 'book' or 'track'
  const [step, setStep] = useState(1);
  
  // Booking Form State
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'Male',
    contactNumber: '',
    email: '',
    address: '',
    selectedServices: [],
    appointmentDate: '',
    timeSlot: '',
  });

  const [confirmedRef, setConfirmedRef] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(serviceId);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter(id => id !== serviceId)
          : [...prev.selectedServices, serviceId]
      };
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(prev => prev + 1);
  };

  const handleCompleteBooking = () => {
    const refCode = `VHD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newAppointment = {
      id: refCode,
      ...formData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    onAddAppointment(newAppointment);
    setConfirmedRef(refCode);
    setStep(5); // Confirmation step
  };

  const resetWizard = () => {
    setFormData({
      fullName: '', dob: '', gender: 'Male', contactNumber: '', email: '', address: '',
      selectedServices: [], appointmentDate: '', timeSlot: '',
    });
    setStep(1);
    setConfirmedRef(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Sub-tabs for Booking vs Tracking */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-200 p-1 rounded-xl flex space-x-1">
          <button
            onClick={() => setTab('book')}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${tab === 'book' ? 'bg-blue-600 text-white shadow' : 'text-slate-700'}`}
          >
            Book New Appointment
          </button>
          <button
            onClick={() => setTab('track')}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${tab === 'track' ? 'bg-blue-600 text-white shadow' : 'text-slate-700'}`}
          >
            Track My Appointment
          </button>
        </div>
      </div>

      {tab === 'book' ? (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Progress Bar */}
          {step < 5 && (
            <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span className={step >= 1 ? 'text-blue-600' : ''}>1. Personal Info</span>
              <span className={step >= 2 ? 'text-blue-600' : ''}>2. Services</span>
              <span className={step >= 3 ? 'text-blue-600' : ''}>3. Schedule</span>
              <span className={step >= 4 ? 'text-blue-600' : ''}>4. Review</span>
            </div>
          )}

          <div className="p-8">
            {/* STEP 1: Personal Information */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Patient Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. Juan Dela Cruz"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                    <input
                      required
                      type="date"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.dob}
                      onChange={e => setFormData({...formData, dob: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.gender}
                      onChange={e => setFormData({...formData, gender: e.target.value})}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                    <input
                      required
                      type="tel"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="09123456789"
                      value={formData.contactNumber}
                      onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="juandelacruz@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-md">
                    Next: Select Services
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Service Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Select Diagnostic Services</h2>
                <p className="text-sm text-slate-500 mb-4">Choose one or more services you wish to avail.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                  {DIAGNOSTIC_SERVICES.map(service => {
                    const isSelected = formData.selectedServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-slate-800">{service.name}</h3>
                          <span className="text-blue-600 font-bold text-sm">₱{service.price}</span>
                        </div>
                        <p className="text-xs text-slate-500">{service.description}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(1)} className="px-6 py-2.5 border rounded-xl font-medium text-slate-600">Back</button>
                  <button
                    disabled={formData.selectedServices.length === 0}
                    onClick={() => setStep(3)}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium shadow-md"
                  >
                    Next: Choose Schedule
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Date & Time Selection */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Select Date & Time Slot</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Appointment Date</label>
                    <input
                      required
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.appointmentDate}
                      onChange={e => setFormData({...formData, appointmentDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Available Time Slot</label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.timeSlot}
                      onChange={e => setFormData({...formData, timeSlot: e.target.value})}
                    >
                      <option value="">Select a time slot</option>
                      {TIME_SLOTS.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(2)} className="px-6 py-2.5 border rounded-xl font-medium text-slate-600">Back</button>
                  <button
                    disabled={!formData.appointmentDate || !formData.timeSlot}
                    onClick={() => setStep(4)}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium shadow-md"
                  >
                    Review Appointment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Summary & Review */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800">Review Appointment Details</h2>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase">Patient Information</h3>
                    <p className="font-semibold text-slate-800 text-lg">{formData.fullName}</p>
                    <p className="text-sm text-slate-600">{formData.contactNumber} | {formData.email}</p>
                  </div>
                  <hr className="border-slate-200" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Selected Services</h3>
                    <ul className="space-y-1">
                      {formData.selectedServices.map(id => {
                        const s = DIAGNOSTIC_SERVICES.find(item => item.id === id);
                        return (
                          <li key={id} className="flex justify-between text-sm text-slate-700">
                            <span>{s.name}</span>
                            <span className="font-semibold">₱{s.price}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <hr className="border-slate-200" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase">Schedule</h3>
                    <p className="text-slate-800 font-medium">{formData.appointmentDate} ({formData.timeSlot})</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(3)} className="px-6 py-2.5 border rounded-xl font-medium text-slate-600">Back</button>
                  <button
                    onClick={handleCompleteBooking}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-md"
                  >
                    Confirm & Submit Booking
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Success Confirmation */}
            {step === 5 && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Appointment Scheduled!</h2>
                <p className="text-slate-600 max-w-md mx-auto">
                  Your appointment has been successfully logged. Please save your reference code below.
                </p>
                <div className="bg-slate-100 border border-slate-200 inline-block px-6 py-3 rounded-xl">
                  <span className="text-xs text-slate-500 block">Reference Code</span>
                  <span className="text-xl font-mono font-bold text-blue-600">{confirmedRef}</span>
                </div>
                <div className="pt-4">
                  <button onClick={resetWizard} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium shadow-md">
                    Book Another Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Track Appointment Tab */
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Track Appointment Status</h2>
          <p className="text-sm text-slate-500 mb-6">Enter your reference code or patient name to look up bookings.</p>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="e.g. VHD-123456 or Juan Dela Cruz"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {appointments
              .filter(a => a.id.toLowerCase().includes(searchQuery.toLowerCase()) || a.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(app => (
                <div key={app.id} className="border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600">{app.id}</span>
                    <h3 className="font-bold text-slate-800">{app.fullName}</h3>
                    <p className="text-xs text-slate-500">{app.appointmentDate} • {app.timeSlot}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    app.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                    app.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                    app.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}