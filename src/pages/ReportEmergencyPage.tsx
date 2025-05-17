import React, { useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useEmergencyStore } from '../stores/emergencyStore';

const emergencyTypes = [
  'Fire',
  'Medical Emergency',
  'Flooding',
  'Gas Leak',
  'Power Outage',
  'Downed Power Line',
  'Traffic Accident',
  'Structural Damage',
  'Other',
];

const ReportEmergencyPage = () => {
  const { user } = useAuthStore();
  const { submitReport, isLoading } = useEmergencyStore();
  
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    contact: user?.name || '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.type) {
      newErrors.type = 'Please select an emergency type';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a description';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Please provide a location';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Please provide a contact name';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a phone number';
    } else if (!/^0[789][01]\d{8}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid Nigerian phone number (e.g., 0803 123 4567)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await submitReport({
        userId: user?.id || '1',
        type: formData.type,
        description: formData.description,
        location: formData.location,
        contact: `${formData.contact} (${formData.phone})`,
      });
      
      setSubmitted(true);
      
      // Reset form
      setFormData({
        type: '',
        description: '',
        location: '',
        contact: user?.name || '',
        phone: '',
      });
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };
  
  const resetForm = () => {
    setSubmitted(false);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Report an Emergency</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Use this form to report an emergency situation in your area. Your report will be sent to the appropriate authorities.
        </p>
      </header>
      
      {submitted ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100 dark:bg-success-900/30">
            <CheckCircle className="h-8 w-8 text-success-600 dark:text-success-400" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Report Submitted
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your emergency report has been submitted successfully. Authorities have been notified and will respond as soon as possible.
          </p>
          <p className="mt-4 text-gray-500 dark:text-gray-500">
            Reference ID: ER-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
          </p>
          <button
            onClick={resetForm}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Report Another Emergency
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary-600 dark:bg-primary-900 p-4 flex items-center text-white">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <h2 className="text-lg font-semibold">Emergency Report Form</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Emergency Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${errors.type ? 'border-danger-500 dark:border-danger-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              >
                <option value="">Select emergency type</option>
                {emergencyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.type}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the emergency situation in detail"
                className={`block w-full px-3 py-2 border ${errors.description ? 'border-danger-500 dark:border-danger-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.description}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Street address, landmarks, or area in Nigeria"
                className={`block w-full px-3 py-2 border ${errors.location ? 'border-danger-500 dark:border-danger-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.location}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`block w-full px-3 py-2 border ${errors.contact ? 'border-danger-500 dark:border-danger-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                />
                {errors.contact && (
                  <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.contact}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0803 123 4567"
                  className={`block w-full px-3 py-2 border ${errors.phone ? 'border-danger-500 dark:border-danger-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.phone}</p>
                )}
              </div>
            </div>
            
            <div className="bg-warning-50 dark:bg-warning-900/20 border-l-4 border-warning-500 p-4 text-sm text-warning-700 dark:text-warning-300">
              <p>
                <strong>Important:</strong> Only use this form for genuine emergencies. False reports may result in penalties.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 md:flex-none bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Emergency Report'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => window.location.href = '/'}
                className="flex-1 md:flex-none bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-6 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">When to call emergency numbers instead:</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Life-threatening emergencies requiring immediate assistance</li>
          <li>Serious medical emergencies (chest pain, severe bleeding, etc.)</li>
          <li>Crimes in progress</li>
          <li>Fire emergencies</li>
          <li>Car accidents with injuries</li>
        </ul>
        <div className="mt-4 text-center space-y-2">
          <a
            href="tel:112"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-danger-600 hover:bg-danger-700 transition-colors"
          >
            Call 112 (Emergency)
          </a>
          <p className="text-sm text-gray-500">Other emergency numbers:</p>
          <div className="space-x-4">
            <a href="tel:08032003557" className="text-primary-600 dark:text-primary-400 hover:underline">Federal Fire Service</a>
            <a href="tel:122" className="text-primary-600 dark:text-primary-400 hover:underline">FRSC</a>
            <a href="tel:08099936312" className="text-primary-600 dark:text-primary-400 hover:underline">NEMA</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportEmergencyPage;