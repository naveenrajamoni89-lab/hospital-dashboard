import { useState } from 'react'
import { useHospital } from '../../context/HospitalContext'

export default function PatientForm({ patient, onClose }) {
  const { addPatient, updatePatient, doctors } = useHospital()
  const isEdit = !!patient

  const [form, setForm] = useState({
    name: patient?.name || '',
    age: patient?.age || '',
    gender: patient?.gender || 'Male',
    bloodGroup: patient?.bloodGroup || 'A+',
    disease: patient?.disease || '',
    doctor: patient?.doctor || (doctors[0]?.name || ''),
    status: patient?.status || 'Stable',
    bedNumber: patient?.bedNumber || '',
    ward: patient?.ward || 'General Ward',
    admissionDate: patient?.admissionDate || new Date().toISOString().split('T')[0],
    emergencyContact: patient?.emergencyContact || '',
    medicines: patient?.medicines?.join(', ') || '',
    dischargeStatus: patient?.dischargeStatus || false,
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.age || form.age < 0) errs.age = 'Valid age is required'
    if (!form.disease.trim()) errs.disease = 'Disease is required'
    if (!form.emergencyContact.trim()) errs.emergencyContact = 'Emergency contact is required'
    if (!form.doctor) errs.doctor = 'Doctor is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const data = {
      ...form,
      age: Number(form.age),
      medicines: form.medicines.split(',').map(m => m.trim()).filter(Boolean),
      dischargeStatus: form.dischargeStatus,
    }

    if (isEdit) {
      updatePatient(patient.id, data)
    } else {
      addPatient(data)
    }
    onClose()
  }

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg text-sm outline-none transition ${
      errors[field] ? 'border-red-300 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className={inputClass('name')} placeholder="Patient name" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
          <input type="number" value={form.age} onChange={e => update('age', e.target.value)} className={inputClass('age')} placeholder="Age" min="0" max="150" />
          {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select value={form.gender} onChange={e => update('gender', e.target.value)} className={inputClass()}>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <select value={form.bloodGroup} onChange={e => update('bloodGroup', e.target.value)} className={inputClass()}>
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Disease/Condition *</label>
          <input type="text" value={form.disease} onChange={e => update('disease', e.target.value)} className={inputClass('disease')} placeholder="Diagnosis" />
          {errors.disease && <p className="text-xs text-red-500 mt-1">{errors.disease}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attending Doctor *</label>
          <select value={form.doctor} onChange={e => update('doctor', e.target.value)} className={inputClass('doctor')}>
            <option value="">Select doctor</option>
            {doctors.map(d => <option key={d.id}>{d.name}</option>)}
          </select>
          {errors.doctor && <p className="text-xs text-red-500 mt-1">{errors.doctor}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select value={form.status} onChange={e => update('status', e.target.value)} className={inputClass()}>
            <option>Critical</option><option>Stable</option><option>Recovering</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
          <select value={form.ward} onChange={e => update('ward', e.target.value)} className={inputClass()}>
            <option>General Ward</option><option>Private Room</option><option>ICU</option><option>Surgical Ward</option><option>Pediatric Ward</option><option>Orthopedic Ward</option><option>Outpatient</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bed Number</label>
          <input type="text" value={form.bedNumber} onChange={e => update('bedNumber', e.target.value)} className={inputClass()} placeholder="e.g. 201A" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
          <input type="date" value={form.admissionDate} onChange={e => update('admissionDate', e.target.value)} className={inputClass()} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact *</label>
          <input type="text" value={form.emergencyContact} onChange={e => update('emergencyContact', e.target.value)} className={inputClass('emergencyContact')} placeholder="Phone number" />
          {errors.emergencyContact && <p className="text-xs text-red-500 mt-1">{errors.emergencyContact}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Medicines (comma separated)</label>
          <input type="text" value={form.medicines} onChange={e => update('medicines', e.target.value)} className={inputClass()} placeholder="Paracetamol, Ibuprofen" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.dischargeStatus} onChange={e => update('dischargeStatus', e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
          <span className="text-sm text-gray-600">Mark as discharged</span>
        </label>
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            {isEdit ? 'Update Patient' : 'Add Patient'}
          </button>
        </div>
      </div>
    </form>
  )
}
