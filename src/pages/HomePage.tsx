import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, Phone } from 'lucide-react';
import { useEmergencyStore } from '../stores/emergencyStore';
import AlertCard from '../components/AlertCard';

const HomePage = () => {
  const { alerts, fetchAlerts, isLoading } = useEmergencyStore();
  
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);
  
  const activeAlerts = alerts.filter(alert => alert.isActive);
  
  return (
    <div className="space-y-8">
      <header className="bg-primary-600 dark:bg-primary-900 text-white rounded-lg p-8 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Nigeria Emergency Response System
          </h1>
          <p className="text-lg mb-6">
            Get real-time emergency information, safety guidelines, and report emergencies across Nigeria.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/report"
              className="bg-warning-500 hover:bg-warning-600 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Report Emergency
            </Link>
            <Link
              to="/guidelines"
              className="bg-secondary-500 hover:bg-secondary-600 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center"
            >
              <Shield className="h-5 w-5 mr-2" />
              Safety Guidelines
            </Link>
          </div>
        </div>
      </header>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Active Alerts in Nigeria
          </h2>
          <Link 
            to="/dashboard" 
            className="text-secondary-600 dark:text-secondary-400 hover:underline text-sm font-medium"
          >
            View All
          </Link>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 mx-auto border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading alerts...</p>
          </div>
        ) : activeAlerts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {activeAlerts.slice(0, 4).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No active alerts at this time.</p>
          </div>
        )}
      </section>
      
      <section className="grid gap-6 md:grid-cols-3">
        <QuickInfoCard
          title="Emergency Contacts"
          icon={<Phone className="h-8 w-8 text-primary-500" />}
          description="Access important Nigerian emergency phone numbers and contact information."
          link="/dashboard"
          linkText="View Contacts"
          color="bg-primary-50 dark:bg-primary-900/20"
        />
        <QuickInfoCard
          title="Evacuation Routes"
          icon={<Shield className="h-8 w-8 text-secondary-500" />}
          description="Check your nearest evacuation routes and safe zones in your state."
          link="/guidelines"
          linkText="View Routes"
          color="bg-secondary-50 dark:bg-secondary-900/20"
        />
        <QuickInfoCard
          title="Weather Updates"
          icon={<AlertTriangle className="h-8 w-8 text-warning-500" />}
          description="Get the latest weather warnings and forecasts for your region in Nigeria."
          link="/dashboard"
          linkText="Check Weather"
          color="bg-warning-50 dark:bg-warning-900/20"
        />
      </section>
    </div>
  );
};

interface QuickInfoCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  linkText: string;
  color: string;
}

const QuickInfoCard = ({ title, icon, description, link, linkText, color }: QuickInfoCardProps) => {
  return (
    <div className={`rounded-lg p-6 ${color} border border-gray-200 dark:border-gray-700`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
      <Link
        to={link}
        className="text-secondary-600 dark:text-secondary-400 font-medium hover:underline"
      >
        {linkText} →
      </Link>
    </div>
  );
};

export default HomePage;