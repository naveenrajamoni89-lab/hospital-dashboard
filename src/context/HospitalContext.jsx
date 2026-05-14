import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { initialDoctors, initialPatients, initialAppointments, initialActivities } from '../data/mockData'
import { useNotification } from './NotificationContext'

const HospitalContext = createContext(null)

let activityId = 5

function formatTimeAgo(date) {
  const diff = Date.now() - date
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`
  const days = Math.floor(hrs / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

export function HospitalProvider({ children }) {
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const { addNotification } = useNotification()

  useEffect(() => {
    const timer = setTimeout(() => {
      setPatients(initialPatients)
      setDoctors(initialDoctors)
      setAppointments(initialAppointments)
      setActivities(initialActivities)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const addActivity = useCallback((text, type) => {
    const entry = { id: ++activityId, text, time: formatTimeAgo(Date.now()), type }
    setActivities(prev => [entry, ...prev].slice(0, 20))
  }, [])

  const getNextPatientId = useCallback(() => {
    const maxNum = patients.reduce((max, p) => {
      const num = parseInt(p.id.replace('P-', ''))
      return num > max ? num : max
    }, 1000)
    return `P-${maxNum + 1}`
  }, [patients])

  const getNextAppointmentId = useCallback(() => {
    const maxNum = appointments.reduce((max, a) => {
      const num = parseInt(a.id.replace('A-', ''))
      return num > max ? num : max
    }, 5000)
    return `A-${maxNum + 1}`
  }, [appointments])

  const addPatient = useCallback((patient) => {
    const newPatient = { ...patient, id: getNextPatientId() }
    setPatients(prev => [...prev, newPatient])
    addActivity(`${newPatient.name} admitted to ${newPatient.ward}`, 'admission')
    addNotification(`Patient ${newPatient.name} added successfully`, 'success')
  }, [getNextPatientId, addActivity, addNotification])

  const updatePatient = useCallback((id, updates) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    addNotification('Patient record updated', 'success')
    addActivity(`${updates.name || 'Patient'} record updated`, 'lab')
  }, [addActivity, addNotification])

  const deletePatient = useCallback((id) => {
    const patient = patients.find(p => p.id === id)
    setPatients(prev => prev.filter(p => p.id !== id))
    if (patient) {
      addActivity(`${patient.name} removed from system`, 'discharge')
      addNotification(`Patient ${patient.name} removed`, 'info')
    }
  }, [patients, addActivity, addNotification])

  const dischargePatient = useCallback((id) => {
    const patient = patients.find(p => p.id === id)
    setPatients(prev => prev.map(p => p.id === id ? { ...p, dischargeStatus: true, status: 'Recovering', bedNumber: '-', ward: 'Discharged' } : p))
    if (patient) {
      addActivity(`${patient.name} discharged from hospital`, 'discharge')
      addNotification(`${patient.name} discharged successfully`, 'success')
    }
  }, [patients, addActivity, addNotification])

  const addAppointment = useCallback((appt) => {
    const newAppt = { ...appt, id: getNextAppointmentId(), status: 'Pending' }
    setAppointments(prev => [...prev, newAppt])
    addActivity(`New appointment scheduled for ${appt.patient} with ${appt.doctor}`, 'appointment')
    addNotification('Appointment scheduled successfully', 'success')
  }, [getNextAppointmentId, addActivity, addNotification])

  const updateAppointmentStatus = useCallback((id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    const appt = appointments.find(a => a.id === id)
    if (appt) {
      addActivity(`Appointment ${status.toLowerCase()} - ${appt.patient}`, status === 'Cancelled' ? 'cancellation' : 'appointment')
      addNotification(`Appointment ${status.toLowerCase()}`, 'success')
    }
  }, [appointments, addActivity, addNotification])

  const getDashboardStats = useCallback(() => {
    const totalPatients = patients.length
    const totalDoctors = doctors.length
    const activePatients = patients.filter(p => !p.dischargeStatus).length
    const criticalPatients = patients.filter(p => p.status === 'Critical').length
    const todayAppts = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length
    const pendingAppts = appointments.filter(a => a.status === 'Pending').length
    const occupiedBeds = patients.filter(p => p.bedNumber && p.bedNumber !== '-' && !p.dischargeStatus).length
    const availableDoctors = doctors.filter(d => d.available).length
    return { totalPatients, totalDoctors, activePatients, criticalPatients, todayAppts, pendingAppts, occupiedBeds, availableDoctors }
  }, [patients, doctors, appointments])

  return (
    <HospitalContext.Provider value={{
      patients, doctors, appointments, activities, loading,
      addPatient, updatePatient, deletePatient, dischargePatient,
      addAppointment, updateAppointmentStatus,
      getDashboardStats,
    }}>
      {children}
    </HospitalContext.Provider>
  )
}

export function useHospital() {
  const context = useContext(HospitalContext)
  if (!context) throw new Error('useHospital must be used within HospitalProvider')
  return context
}
