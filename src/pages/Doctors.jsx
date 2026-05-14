import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHospital } from '../context/HospitalContext'
import StatusBadge from '../components/common/StatusBadge'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { Search, Star, Clock, User, MapPin, Eye } from 'lucide-react'

export default function Doctors() {
  const navigate = useNavigate()
  const { doctors, loading } = useHospital()
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')

  const specialties = ['All', ...new Set(doctors.map(d => d.specialty))]
  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchSpecialty = specialty === 'All' || d.specialty === specialty
    return matchSearch && matchSpecialty
  })

  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
        <p className="text-sm text-gray-500 mt-1">{doctors.length} medical specialists on staff</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {specialties.map(s => (
            <button key={s} onClick={() => setSpecialty(s)} className={`px-3 py-2 text-sm rounded-lg font-medium transition cursor-pointer ${specialty === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-blue-600">{doctor.specialty}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500"><Clock size={14} /><span>{doctor.experience} years exp.</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-500"><Star size={14} className="text-yellow-400" /><span>{doctor.rating} / 5.0</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-500"><MapPin size={14} /><span>{doctor.patients} patients</span></div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <StatusBadge status={doctor.available ? 'Available' : 'Unavailable'} />
              <button onClick={() => navigate(`/doctors/${doctor.id}`)} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer">
                <Eye size={15} /> View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
