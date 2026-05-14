import { useState } from 'react'
import { useHospital } from '../../context/HospitalContext'

export default function AppointmentForm({ onClose }) {
  const { addAppointment, patients, doctors } = useHospital()

  const [form, setForm] = useState({
    patient: patients[0]?.name || '',
    doctor: doctors[0]?.name || '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00 AM',
    type: 'Checkup',
    notes: '',
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.patient) errs.patient = 'Patient is required'
    if (!form.doctor) errs.doctor = 'Doctor is required'
    if (!form.date) errs.date = 'Date is required'
    if (!form.time) errs.time = 'Time is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    addAppointment(form)
    onClose()
  }

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
          <select value={form.patient} onChange={e => update('patient', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition ${errors.patient ? 'border-red-300' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'}`}>
            <option value="">Select patient</option>
            {patients.filter(p => !p.dischargeStatus).map(p => <option key={p.id}>{p.name}</option>)}
          </select>
          {errors.patient && <p className="text-xs text-red-500 mt-1">{errors.patient}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Doctor *</label>
          <select value={form.doctor} onChange={e => update('doctor', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition ${errors.doctor ? 'border-red-300' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'}`}>
            <option value="">Select doctor</option>
            {doctors.map(d => <option key={d.id}>{d.name}</option>)}
          </select>
          {errors.doctor && <p className="text-xs text-red-500 mt-1">{errors.doctor}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input type="date" value={form.date} onChange={e => update('date', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition ${errors.date ? 'border-red-300' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'}`} />
          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
          <select value={form.time} onChange={e => update('time', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
            {['08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select value={form.type} onChange={e => update('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
            <option>Checkup</option><option>Follow-up</option><option>Consultation</option><option>Surgery</option><option>Emergency</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <input type="text" value={form.notes} onChange={e => update('notes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional notes" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer">Schedule Appointment</button>
      </div>
    </form>
  )
}
