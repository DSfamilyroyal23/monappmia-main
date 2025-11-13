
import React, { useState, createContext, useContext, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import PlatformLayout from './layouts/PlatformLayout';
import { User, UserRole } from './types';
import { LOGGED_IN_COMPANY, LOGGED_IN_WORKER } from './constants';

type AppState = 'landing' | 'auth' | 'platform';
type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('mia-theme') as Theme | null;
        // Default to 'light' theme if no theme is stored, ignoring system preference.
        const initialTheme = storedTheme || 'light';
        setTheme(initialTheme);
    }, []);

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem('mia-theme', newTheme);
        setThemeState(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const AppContent: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('landing');
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (role: UserRole) => {
        setUser(role === 'company' ? LOGGED_IN_COMPANY : LOGGED_IN_WORKER);
        setAppState('platform');
    };
    
    const handleLogout = () => {
        setUser(null);
        setAppState('landing');
    };

    switch (appState) {
        case 'landing':
            return <LandingPage onLoginClick={() => setAppState('auth')} />;
        case 'auth':
            return <AuthPage onLogin={handleLogin} onBack={() => setAppState('landing')} />;
        case 'platform':
            if (user) {
                return <PlatformLayout user={user} onLogout={handleLogout} />;
            }
            // Fallback to landing if user is null
            setAppState('landing');
            return <LandingPage onLoginClick={() => setAppState('auth')} />;
        default:
            return <LandingPage onLoginClick={() => setAppState('auth')} />;
    }
}


const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;