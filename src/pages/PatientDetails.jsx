import { useParams, useNavigate } from 'react-router-dom'
import { useHospital } from '../context/HospitalContext'

import StatusBadge from '../components/common/StatusBadge'
import LoadingSpinner from '../components/common/LoadingSpinner'

import {
  ArrowLeft,
  Phone,
  Calendar,
  Bed,
  Droplets,
  Stethoscope,
  Pill,
  User,
  HeartPulse,
  ShieldCheck,
  Activity,
} from 'lucide-react'

export default function PatientDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    patients,
    doctors,
    loading,
  } = useHospital()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const patient = patients.find(
    p => p.id === id
  )

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">

        <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md w-full border border-gray-100">

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Patient Not Found
          </h2>

          <p className="text-gray-500 mb-6">
            No patient found with ID {id}
          </p>

          <button
            onClick={() =>
              navigate('/patients')
            }
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all duration-300 cursor-pointer"
          >
            Back to Patients
          </button>
        </div>
      </div>
    )
  }

  const doctor = doctors.find(
    d => d.name === patient.doctor
  )

  const wardColors = {
    ICU: 'bg-red-100 text-red-700 border-red-200',
    'General Ward':
      'bg-blue-100 text-blue-700 border-blue-200',
    'Private Room':
      'bg-purple-100 text-purple-700 border-purple-200',
    'Surgical Ward':
      'bg-orange-100 text-orange-700 border-orange-200',
    'Pediatric Ward':
      'bg-pink-100 text-pink-700 border-pink-200',
    Discharged:
      'bg-green-100 text-green-700 border-green-200',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-4 md:p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() =>
          navigate('/patients')
        }
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 mb-6 transition-all duration-300 hover:translate-x-1 cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back to Patients
      </button>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-1 space-y-5">

          {/* PROFILE CARD */}
          <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-sky-500 rounded-3xl p-7 text-white shadow-2xl relative overflow-hidden">

            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">

              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg">

                <span className="text-3xl font-bold text-white">
                  {patient.name.charAt(0)}
                </span>
              </div>

              <h2 className="text-2xl font-bold">
                {patient.name}
              </h2>

              <p className="text-white/80 mt-1">
                {patient.id}
              </p>

              {/* STATUS */}
              <div className="mt-5 flex justify-center flex-wrap gap-2">

                <StatusBadge
                  status={patient.status}
                />

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${wardColors[
                    patient.ward
                    ] ||
                    'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                >
                  {patient.ward}
                </span>
              </div>

              {/* DISCHARGED */}
              {patient.dischargeStatus && (
                <div className="mt-3">

                  <span className="inline-flex items-center gap-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">

                    <ShieldCheck size={13} />

                    Discharged
                  </span>
                </div>
              )}

              {/* QUICK STATS */}
              <div className="grid grid-cols-2 gap-4 mt-7">

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">

                  <p className="text-white/70 text-xs">
                    Age
                  </p>

                  <h3 className="text-2xl font-bold mt-1">
                    {patient.age}
                  </h3>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">

                  <p className="text-white/70 text-xs">
                    Blood Group
                  </p>

                  <h3 className="text-2xl font-bold mt-1">
                    {
                      patient.bloodGroup
                    }
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-5">

              <Phone
                size={18}
                className="text-blue-600"
              />

              <h3 className="text-lg font-semibold text-gray-900">
                Contact Information
              </h3>
            </div>

            <div className="space-y-4">

              {/* PHONE */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">

                <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">

                  <Phone
                    size={17}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Emergency Contact
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {
                      patient.emergencyContact
                    }
                  </p>
                </div>
              </div>

              {/* DATE */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-2xl">

                <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">

                  <Calendar
                    size={17}
                    className="text-cyan-600"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Admission Date
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {
                      patient.admissionDate
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* MEDICAL INFO */}
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-6">

              <HeartPulse
                size={18}
                className="text-blue-600"
              />

              <h3 className="text-lg font-semibold text-gray-900">
                Medical Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

              {/* AGE */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50">

                <p className="text-xs text-gray-500">
                  Age / Gender
                </p>

                <p className="text-sm font-semibold text-gray-900 mt-2">
                  {patient.age} /{' '}
                  {patient.gender}
                </p>
              </div>

              {/* BLOOD */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-red-50">

                <p className="text-xs text-gray-500">
                  Blood Group
                </p>

                <p className="text-sm font-semibold text-gray-900 mt-2">
                  {
                    patient.bloodGroup
                  }
                </p>
              </div>

              {/* CONDITION */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-cyan-50">

                <p className="text-xs text-gray-500">
                  Condition
                </p>

                <p className="text-sm font-semibold text-gray-900 mt-2">
                  {patient.disease}
                </p>
              </div>

              {/* BED */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-purple-50">

                <p className="text-xs text-gray-500">
                  Bed Number
                </p>

                <p className="text-sm font-semibold text-gray-900 mt-2">
                  {patient.bedNumber ||
                    '—'}
                </p>
              </div>
            </div>
          </div>

          {/* DOCTOR & TREATMENT */}
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-6">

              <Stethoscope
                size={18}
                className="text-blue-600"
              />

              <h3 className="text-lg font-semibold text-gray-900">
                Doctor & Treatment
              </h3>
            </div>

            {/* DOCTOR */}
            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl mb-6">

              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">

                <User
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {patient.doctor}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {doctor?.specialty ||
                    'Doctor'}
                </p>
              </div>
            </div>

            {/* MEDICINES */}
            <div>

              <div className="flex items-center gap-2 mb-4">

                <Pill
                  size={16}
                  className="text-blue-600"
                />

                <h4 className="text-sm font-semibold text-gray-900">
                  Prescribed Medicines
                </h4>
              </div>

              <div className="flex flex-wrap gap-3">

                {patient.medicines.map(
                  (m, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                    >
                      {m}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ADMISSION DETAILS */}
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-6">

              <Activity
                size={18}
                className="text-blue-600"
              />

              <h3 className="text-lg font-semibold text-gray-900">
                Admission Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* WARD */}
              <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">

                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">

                  <Bed
                    size={18}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Ward
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {patient.ward}
                  </p>
                </div>
              </div>

              {/* BLOOD */}
              <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-50 to-red-50 rounded-2xl">

                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">

                  <Droplets
                    size={18}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Blood Group
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {
                      patient.bloodGroup
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}