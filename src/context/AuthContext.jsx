import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const storedUser = () => {
  try {
    const saved = localStorage.getItem("hospital_user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const storedAccounts = () => {
  try {
    const saved = localStorage.getItem("hospital_accounts");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storedUser);
  const [accounts, setAccounts] = useState(storedAccounts);

  useEffect(() => {
    if (user) {
      localStorage.setItem("hospital_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("hospital_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("hospital_accounts", JSON.stringify(accounts));
  }, [accounts]);

  const login = (email, password) => {
    const account = accounts.find(
      (acc) =>
        acc.email.toLowerCase() === email.toLowerCase() &&
        acc.password === password,
    );

    if (!account) {
      return {
        success: false,
        message:
          "Invalid email or password. If you do not have an account, please register.",
      };
    }

    const userData = {
      email: account.email,
      role: account.role,
      name: account.name,
    };
    setUser(userData);
    return { success: true };
  };

  const register = (email, password, role) => {
    const existing = accounts.some(
      (acc) => acc.email.toLowerCase() === email.toLowerCase(),
    );

    if (existing) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const account = {
      email,
      password,
      role,
      name: email.split("@")[0],
    };

    setAccounts((prev) => [...prev, account]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
