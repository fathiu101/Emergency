import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, X, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useTheme } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import { useEmergencyStore, EmergencyAlert } from '../stores/emergencyStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { toggleTheme } = useTheme();
  const { alerts } = useEmergencyStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const activeAlerts = alerts.filter(alert => alert.isActive);
  
  return (
    <nav className="bg-primary-600 dark:bg-primary-950 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <AlertTriangle className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Emergency Response</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full hover:bg-primary-700 dark:hover:bg-primary-800 relative"
                aria-label="Notifications"
              >
                <Bell className="h-6 w-6" />
                {activeAlerts.length > 0 && (
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-warning-500 ring-2 ring-primary-600 dark:ring-primary-950" />
                )}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20">
                  <div className="py-2 px-3 bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-600">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Alert Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {activeAlerts.length > 0 ? (
                      activeAlerts.map((alert) => (
                        <AlertNotification key={alert.id} alert={alert} />
                      ))
                    ) : (
                      <div className="py-4 px-3 text-center text-gray-500 dark:text-gray-400">
                        No active alerts
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-primary-700 dark:hover:bg-primary-800">
                <span>{user?.name}</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Your Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-primary-700 dark:hover:bg-primary-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-500 dark:bg-primary-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-white hover:bg-primary-700 dark:hover:bg-primary-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <div className="px-3 py-2 flex items-center justify-between">
              <span className="text-white">Dark Mode</span>
              <ThemeToggle />
            </div>
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-primary-700 dark:hover:bg-primary-800"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const AlertNotification = ({ alert }: { alert: EmergencyAlert }) => {
  const alertColor = {
    danger: 'bg-danger-100 dark:bg-danger-900/30 border-l-4 border-danger-500',
    warning: 'bg-warning-100 dark:bg-warning-900/30 border-l-4 border-warning-500',
    info: 'bg-secondary-100 dark:bg-secondary-900/30 border-l-4 border-secondary-500',
    success: 'bg-success-100 dark:bg-success-900/30 border-l-4 border-success-500',
  }[alert.type];
  
  return (
    <div className={`px-3 py-3 ${alertColor}`}>
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
          {alert.title}
        </h4>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
        {alert.message}
      </p>
      {alert.location && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Location: {alert.location}
        </p>
      )}
    </div>
  );
};

export default Navbar;