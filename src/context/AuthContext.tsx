import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'employee' | 'moderator' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, User & { password: string }> = {
  'employee@company.com': {
    id: '1',
    name: 'John Employee',
    email: 'employee@company.com',
    role: 'employee',
    password: 'password123',
  },
  'moderator@company.com': {
    id: '2',
    name: 'Jane Moderator',
    email: 'moderator@company.com',
    role: 'moderator',
    password: 'password123',
  },
  'admin@company.com': {
    id: '3',
    name: 'Alex Admin',
    email: 'admin@company.com',
    role: 'admin',
    password: 'password123',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _pass, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
