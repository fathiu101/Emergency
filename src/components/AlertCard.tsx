import React from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { EmergencyAlert } from '../stores/emergencyStore';

interface AlertCardProps {
  alert: EmergencyAlert;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const { type, title, message, location, timestamp, isActive } = alert;
  
  const getAlertStyles = () => {
    switch (type) {
      case 'danger':
        return {
          bgColor: 'bg-danger-100 dark:bg-danger-900/30',
          borderColor: 'border-danger-500',
          textColor: 'text-danger-800 dark:text-danger-300',
          icon: <AlertCircle className="h-10 w-10 text-danger-500" />,
        };
      case 'warning':
        return {
          bgColor: 'bg-warning-100 dark:bg-warning-900/30',
          borderColor: 'border-warning-500',
          textColor: 'text-warning-800 dark:text-warning-300',
          icon: <AlertTriangle className="h-10 w-10 text-warning-500" />,
        };
      case 'info':
        return {
          bgColor: 'bg-secondary-100 dark:bg-secondary-900/30',
          borderColor: 'border-secondary-500',
          textColor: 'text-secondary-800 dark:text-secondary-300',
          icon: <Info className="h-10 w-10 text-secondary-500" />,
        };
      case 'success':
        return {
          bgColor: 'bg-success-100 dark:bg-success-900/30',
          borderColor: 'border-success-500',
          textColor: 'text-success-800 dark:text-success-300',
          icon: <CheckCircle className="h-10 w-10 text-success-500" />,
        };
      default:
        return {
          bgColor: 'bg-gray-100 dark:bg-gray-900/30',
          borderColor: 'border-gray-500',
          textColor: 'text-gray-800 dark:text-gray-300',
          icon: <Info className="h-10 w-10 text-gray-500" />,
        };
    }
  };
  
  const styles = getAlertStyles();
  
  return (
    <div 
      className={`relative rounded-lg p-5 shadow-sm border-l-4 ${styles.borderColor} ${styles.bgColor} ${!isActive ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${styles.textColor}`}>{title}</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(timestamp).toLocaleString()}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-700 dark:text-gray-300">{message}</p>
            {location && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Location: {location}
              </p>
            )}
          </div>
        </div>
      </div>
      {!isActive && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded">
          Resolved
        </div>
      )}
    </div>
  );
};

export default AlertCard;