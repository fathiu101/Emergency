import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useForm, ValidationError } from '@formspree/react';

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

const emergencyInfo = {
  'Fire': {
    message: '🔥 Call the fire department immediately and evacuate if necessary.',
    number: '112 or 08032003557',
  },
  'Medical Emergency': {
    message: '🚑 Provide first aid if trained and call for medical help.',
    number: '112',
  },
  'Flooding': {
    message: '🌊 Move to higher ground and avoid walking or driving through floodwaters.',
    number: ' 122 or 0700 2255 378',
  },
  'Gas Leak': {
    message: '⚠️ Do not use electrical appliances. Evacuate and call emergency services.',
    number: '0800 123 9999',
  },
  'Power Outage': {
    message: '💡 Report outages to the power provider and stay away from fallen lines.',
    number: '0700 2255 378',
  },
  'Downed Power Line': {
    message: '⚡ Stay at least 10 meters away and call for assistance.',
    number: '0800 123 1000',
  },
  'Traffic Accident': {
    message: '🚗 Secure the scene and call emergency services if there are injuries.',
    number: '122',
  },
  'Structural Damage': {
    message: '🏚️ Avoid entering damaged buildings and contact emergency authorities.',
    number: '112',
  },
  'Other': {
    message: '📞 Contact local emergency services for more information.',
    number: '112',
  },
};

const ReportEmergencyPage = () => {
  const { user } = useAuthStore();
  const [state, handleSubmit] = useForm('mgvkddqe');
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    contact: user?.name || '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogNumber, setDialogNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'type' && value) {
      const info = emergencyInfo[value];
      if (info) {
        setDialogMessage(info.message);
        setDialogNumber(info.number);
        setShowDialog(true);
      } else {
        setShowDialog(false);
      }
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e).then(() => {
      setSubmitted(true);
    });
  };

  const resetForm = () => {
    setSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {submitted ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100">
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold">Report Submitted</h2>
          <p>Your emergency report has been submitted successfully.</p>
          <button onClick={resetForm} className="mt-6 bg-primary-600 text-white px-4 py-2 rounded-md">
            Report Another Emergency
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
          {/* Emergency Dialog Box */}
          {showDialog && (
            <div className="bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 text-sm text-yellow-800 dark:text-yellow-300 rounded-md">
              <p className="font-semibold mb-1">Notice:</p>
              <p className="mb-1">{dialogMessage}</p>
              <p>
                <strong>Emergency Number:</strong>{' '}
                <a href={`tel:${dialogNumber}`} className="text-blue-600 underline">
                  {dialogNumber}
                </a>
              </p>
            </div>
          )}

          {/* Emergency Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Emergency Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${
                errors.type ? 'border-danger-500 dark:border-danger-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none`}
            >
              <option value="">Select emergency type</option>
              {emergencyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.type}</p>}
          </div>

          {/* Email */}
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input id="email" type="email" name="email" required className="w-full px-3 py-2 border rounded-md" />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          {/* Description */}
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description *
          </label>
          <textarea id="message" name="message" required className="w-full px-3 py-2 border rounded-md" />
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          {/* Location */}
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
              className={`block w-full px-3 py-2 border ${
                errors.location ? 'border-danger-500 dark:border-danger-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none`}
            />
            <ValidationError prefix="Location" field="message" errors={state.errors} />
            {errors.location && <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.location}</p>}
          </div>

          {/* Contact & Phone */}
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
                className={`block w-full px-3 py-2 border ${
                  errors.contact ? 'border-danger-500 dark:border-danger-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
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
                className={`block w-full px-3 py-2 border ${
                  errors.phone ? 'border-danger-500 dark:border-danger-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-warning-50 dark:bg-warning-900/20 border-l-4 border-warning-500 p-4 text-sm text-warning-700 dark:text-warning-300">
            <p>
              <strong>Important:</strong> Only use this form for genuine emergencies. False reports may result in
              penalties.
            </p>
          </div>

          {/* Submit */}
          <button type="submit" disabled={state.submitting} className="bg-primary-600 text-white px-4 py-2 rounded-md">
            {state.submitting ? 'Submitting...' : 'Submit Emergency Report'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReportEmergencyPage;
