import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHospital } from '../context/HospitalContext'
import { useAuth } from '../context/AuthContext'
import Modal from '../components/common/Modal'
import PatientForm from '../components/patients/PatientForm'
import StatusBadge from '../components/common/StatusBadge'
import EmptyState from '../components/common/EmptyState'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useSort from '../hooks/useSort'
import { Search, Plus, Edit2, Trash2, UserX, Filter, ChevronLeft, ChevronRight, Eye, ArrowUpDown } from 'lucide-react'

export default function Patients() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { patients, deletePatient, dischargePatient, loading } = useHospital()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [wardFilter, setWardFilter] = useState('All')
  const [doctorFilter, setDoctorFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editPatient, setEditPatient] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 8
  const { sortFn, toggleSort, sortField, sortDir } = useSort('name')
  const isAdmin = user?.role === 'admin'

  const statuses = ['All', 'Critical', 'Stable', 'Recovering']
  const wards = ['All', ...new Set(patients.map(p => p.ward))]
  const doctors = ['All', ...new Set(patients.map(p => p.doctor))]

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || p.status === statusFilter
    const matchWard = wardFilter === 'All' || p.ward === wardFilter
    const matchDoctor = doctorFilter === 'All' || p.doctor === doctorFilter
    return matchSearch && matchStatus && matchWard && matchDoctor
  })

  const sorted = sortFn(filtered)
  const totalPages = Math.ceil(sorted.length / perPage)
  const paginated = sorted.slice((currentPage - 1) * perPage, currentPage * perPage)

  const wardColors = {
    'ICU': 'bg-red-50 text-red-700', 'General Ward': 'bg-blue-50 text-blue-700', 'Private Room': 'bg-purple-50 text-purple-700',
    'Surgical Ward': 'bg-orange-50 text-orange-700', 'Pediatric Ward': 'bg-pink-50 text-pink-700', 'Orthopedic Ward': 'bg-teal-50 text-teal-700',
    'Outpatient': 'bg-gray-50 text-gray-600', 'Discharged': 'bg-green-50 text-green-700',
  }

  const SortTh = ({ field, children }) => (
    <th className="text-left px-3 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort(field)}>
      <span className="inline-flex items-center gap-1 hover:text-gray-900">
        {children}
        <ArrowUpDown size={12} className={`text-gray-300 ${sortField === field ? 'text-blue-600' : ''}`} />
      </span>
    </th>
  )

  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-sm text-gray-500 mt-1">{patients.length} total records</p>
        </div>
        {isAdmin && (
          <button onClick={() => { setEditPatient(null); setModalOpen(true) }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer">
            <Plus size={18} /> Add Patient
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1) }} placeholder="Search by name or ID..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {statuses.map(s => (
                <button key={s} onClick={() => { setStatusFilter(s); setCurrentPage(1) }} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition cursor-pointer ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap items-center text-sm">
            <Filter size={14} className="text-gray-400" />
            <select value={wardFilter} onChange={e => { setWardFilter(e.target.value); setCurrentPage(1) }} className="px-2 py-1 border border-gray-200 rounded text-xs outline-none">
              {wards.map(w => <option key={w}>{w}</option>)}
            </select>
            <select value={doctorFilter} onChange={e => { setDoctorFilter(e.target.value); setCurrentPage(1) }} className="px-2 py-1 border border-gray-200 rounded text-xs outline-none">
              {doctors.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <SortTh field="id">ID</SortTh>
                <SortTh field="name">Patient</SortTh>
                <SortTh field="age">Age/Gender</SortTh>
                <th className="text-left px-3 py-3 font-medium">Blood</th>
                <SortTh field="disease">Disease</SortTh>
                <SortTh field="doctor">Doctor</SortTh>
                <th className="text-left px-3 py-3 font-medium">Bed/Ward</th>
                <SortTh field="status">Status</SortTh>
                <SortTh field="admissionDate">Admitted</SortTh>
                <th className="text-left px-3 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={10}><EmptyState title="No patients found" description="Try adjusting search or filters" icon={UserX} /></td></tr>
              ) : paginated.map(p => (
                <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap">{p.id}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{p.name.charAt(0)}</span>
                      </div>
                      <span className="text-gray-900 font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{p.age}/{p.gender.charAt(0)}</td>
                  <td className="px-3 py-3"><span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{p.bloodGroup}</span></td>
                  <td className="px-3 py-3 text-gray-700 max-w-[120px] truncate" title={p.disease}>{p.disease}</td>
                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{p.doctor}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`text-xs px-2 py-0.5 rounded ${wardColors[p.ward] || 'bg-gray-50 text-gray-600'}`}>
                      {p.bedNumber && p.bedNumber !== '-' ? `${p.bedNumber}` : '—'} {p.ward}
                    </span>
                  </td>
                  <td className="px-3 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-3 py-3 text-xs text-gray-500 whitespace-nowrap">{p.admissionDate}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => navigate(`/patients/${p.id}`)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer" title="View"><Eye size={14} /></button>
                      {isAdmin && (
                        <>
                          <button onClick={() => { setEditPatient(p); setModalOpen(true) }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer" title="Edit"><Edit2 size={14} /></button>
                          {!p.dischargeStatus && (
                            <button onClick={() => dischargePatient(p.id)} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition cursor-pointer" title="Discharge"><UserX size={14} /></button>
                          )}
                          <button onClick={() => deletePatient(p.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition cursor-pointer" title="Delete"><Trash2 size={14} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sorted.length > perPage && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">Showing {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, sorted.length)} of {sorted.length}</p>
            <div className="flex gap-1">
              <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 cursor-pointer"><ChevronLeft size={16} /></button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 text-xs rounded font-medium transition cursor-pointer ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 cursor-pointer"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditPatient(null) }} title={editPatient ? 'Edit Patient' : 'Add New Patient'} size="max-w-3xl">
        <PatientForm patient={editPatient} onClose={() => { setModalOpen(false); setEditPatient(null) }} />
      </Modal>
    </div>
  )
}
