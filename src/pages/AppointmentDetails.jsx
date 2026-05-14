import { useParams, useNavigate } from 'react-router-dom'
import { useHospital } from '../context/HospitalContext'
import StatusBadge from '../components/common/StatusBadge'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { ArrowLeft, Calendar, Clock, User, Stethoscope, FileText } from 'lucide-react'

export default function AppointmentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { appointments, patients, doctors, updateAppointmentStatus, loading } = useHospital()

  if (loading) return <LoadingSpinner size="lg" />

  const appointment = appointments.find(a => a.id === id)

  if (!appointment) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Appointment not found</h2>
        <p className="text-gray-500 mb-4">No appointment found with ID {id}</p>
        <button onClick={() => navigate('/appointments')} className="text-blue-600 hover:underline cursor-pointer">Back to Appointments</button>
      </div>
    )
  }

  const patient = patients.find(p => p.name === appointment.patient)
  const doctor = doctors.find(d => d.name === appointment.doctor)
  const statusActions = ['Confirmed', 'Completed', 'Cancelled'].filter(s => s !== appointment.status)

  return (
    <div>
      <button onClick={() => navigate('/appointments')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition cursor-pointer">
        <ArrowLeft size={16} /> Back to Appointments
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <StatusBadge status={appointment.status} className="text-sm px-4 py-1.5" />
            <h2 className="text-xl font-bold text-gray-900 mt-4">{appointment.id}</h2>
            <p className="text-sm text-gray-500 mt-1">{appointment.type}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Actions</h3>
            <div className="flex flex-col gap-2">
              {statusActions.map(action => {
                const colors = {
                  Confirmed: 'bg-blue-600 hover:bg-blue-700 text-white',
                  Completed: 'bg-green-600 hover:bg-green-700 text-white',
                  Cancelled: 'bg-red-500 hover:bg-red-600 text-white',
                }
                return (
                  <button key={action} onClick={() => { updateAppointmentStatus(appointment.id, action); navigate('/appointments') }}
                    className={`w-full py-2 text-sm font-medium rounded-lg transition cursor-pointer ${colors[action]}`}>
                    Mark as {action}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Appointment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar size={16} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock size={16} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText size={16} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm font-medium text-gray-900">{appointment.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <StatusBadge status={appointment.status} />
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-medium text-gray-900">{appointment.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Patient & Doctor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition" onClick={() => patient && navigate(`/patients/${patient.id}`)}>
                <User size={16} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Patient</p>
                  <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                  {patient && <p className="text-xs text-gray-400">{patient.disease}</p>}
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition" onClick={() => doctor && navigate(`/doctors/${doctor.id}`)}>
                <Stethoscope size={16} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Doctor</p>
                  <p className="text-sm font-medium text-gray-900">{appointment.doctor}</p>
                  {doctor && <p className="text-xs text-gray-400">{doctor.specialty}</p>}
                </div>
              </div>
            </div>
          </div>

          {appointment.notes && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Notes</h3>
              <p className="text-sm text-gray-700">{appointment.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
