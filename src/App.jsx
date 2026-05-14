import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { NotificationProvider } from './context/NotificationContext'
import { HospitalProvider } from './context/HospitalContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <HospitalProvider>
            <AppRoutes />
          </HospitalProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
