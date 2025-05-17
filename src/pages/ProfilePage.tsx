import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { User, Mail, Lock, Phone, MapPin, Bell } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '555-123-4567',
    address: '123 Main Street, Anytown, USA',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });
  
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name.split('.')[1]]: checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      setMessage({
        type: 'success',
        text: 'Profile updated successfully',
      });
      setEditMode(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match',
      });
      return;
    }
    
    if (formData.newPassword.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters',
      });
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setMessage({
        type: 'success',
        text: 'Password changed successfully',
      });
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };
  
  const handleNotificationChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      setMessage({
        type: 'success',
        text: 'Notification preferences updated',
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile, security, and notification preferences
        </p>
      </header>
      
      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 border-l-4 border-success-500' 
            : 'bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-300 border-l-4 border-danger-500'
        }`}>
          <p>{message.text}</p>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'password'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('password')}
            >
              Password
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 text-sm font-medium"
                >
                  {editMode ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              {editMode ? (
                <form onSubmit={handleSubmitProfile}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="block w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="block w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="block w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="block w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                      <p className="mt-1 text-lg text-gray-900 dark:text-white">{formData.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                      <p className="mt-1 text-lg text-gray-900 dark:text-white">{formData.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="mt-1 text-lg text-gray-900 dark:text-white">{formData.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</p>
                      <p className="mt-1 text-lg text-gray-900 dark:text-white">{formData.address}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Account created on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'password' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Change Password</h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="block w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="block w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 8 characters long
                  </p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="block w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
              
              <form onSubmit={handleNotificationChange} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Receive emergency alerts via email
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifications.email"
                        name="notifications.email"
                        checked={formData.notifications.email}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Receive emergency alerts via text message
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifications.sms"
                        name="notifications.sms"
                        checked={formData.notifications.sms}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Receive emergency alerts via browser notifications
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifications.push"
                        name="notifications.push"
                        checked={formData.notifications.push}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Danger Zone</h2>
          
          <div className="border border-danger-300 dark:border-danger-700 rounded-md">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Delete Account</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      logout();
                    }
                  }}
                  className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-danger-600 dark:text-danger-400 font-medium py-2 px-4 border border-danger-300 dark:border-danger-600 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;