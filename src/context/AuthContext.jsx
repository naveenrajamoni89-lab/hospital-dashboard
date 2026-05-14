import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const storedUser = () => {
  try {
    const saved = localStorage.getItem('hospital_user')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storedUser)

  useEffect(() => {
    if (user) {
      localStorage.setItem('hospital_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('hospital_user')
    }
  }, [user])

  const login = (email, role) => {
    const userData = { email, role, name: email.split('@')[0] }
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
