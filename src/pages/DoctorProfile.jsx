import { useParams, useNavigate } from 'react-router-dom'
import { useHospital } from '../context/HospitalContext'
import StatusBadge from '../components/common/StatusBadge'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { ArrowLeft, User, Mail, Phone, Clock, GraduationCap, Stethoscope, DollarSign, Calendar } from 'lucide-react'

export default function DoctorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { doctors, patients, loading } = useHospital()

  if (loading) return <LoadingSpinner size="lg" />

  const doctor = doctors.find(d => d.id === Number(id))

  if (!doctor) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Doctor not found</h2>
        <p className="text-gray-500 mb-4">No doctor found with ID {id}</p>
        <button onClick={() => navigate('/doctors')} className="text-blue-600 hover:underline cursor-pointer">Back to Doctors</button>
      </div>
    )
  }

  const assignedPatients = patients.filter(p => p.doctor === doctor.name)

  return (
    <div>
      <button onClick={() => navigate('/doctors')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition cursor-pointer">
        <ArrowLeft size={16} /> Back to Doctors
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <User size={36} className="text-white" />
            </div>
            <h3 className="text-lg font-bold">{doctor.name}</h3>
            <p className="text-sm text-white/80">{doctor.specialty}</p>
            <div className="mt-4 flex justify-center">
              <StatusBadge status={doctor.available ? 'Available' : 'Unavailable'} className="bg-white/20 text-white border-white/30" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mt-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Details</h4>
            {[
              { icon: GraduationCap, label: 'Qualification', value: doctor.qualification },
              { icon: Clock, label: 'Experience', value: `${doctor.experience} years` },
              { icon: Stethoscope, label: 'Department', value: doctor.department },
              { icon: DollarSign, label: 'Fee', value: `$${doctor.consultationFee}` },
              { icon: Clock, label: 'Timing', value: doctor.availabilityTiming },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <Icon size={14} className="text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Phone size={16} className="text-blue-600" /> Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Mail size={14} className="text-gray-400" />
                <span className="text-sm text-gray-700">{doctor.email}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Phone size={14} className="text-gray-400" />
                <span className="text-sm text-gray-700">{doctor.contact}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Assigned Patients ({assignedPatients.length})</h4>
            {assignedPatients.length === 0 ? (
              <p className="text-sm text-gray-400">No patients currently assigned</p>
            ) : (
              <div className="space-y-2">
                {assignedPatients.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition cursor-pointer" onClick={() => navigate(`/patients/${p.id}`)}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{p.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.disease} - {p.status}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{p.bedNumber && p.bedNumber !== '-' ? `Bed ${p.bedNumber}` : p.ward}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" /> Recent Appointments
            </h4>
            {doctor.recentAppointments.length === 0 ? (
              <p className="text-sm text-gray-400">No recent appointments</p>
            ) : (
              <div className="space-y-2">
                {doctor.recentAppointments.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{a.patient}</p>
                      <p className="text-xs text-gray-500">{a.type}</p>
                    </div>
                    <span className="text-xs text-gray-400">{a.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
