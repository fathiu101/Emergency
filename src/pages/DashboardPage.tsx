import React, { useEffect } from 'react';
import { useEmergencyStore } from '../stores/emergencyStore';
import { useAuthStore } from '../stores/authStore';
import AlertCard from '../components/AlertCard';
import { Bell, Calendar, Phone, Map, AlertTriangle } from 'lucide-react';

const DashboardPage = () => {
  const { alerts, userReports, fetchAlerts, fetchUserReports, isLoading } = useEmergencyStore();
  const { user } = useAuthStore();
  
  useEffect(() => {
    fetchAlerts();
    if (user) {
      fetchUserReports(user.id);
    }
  }, [fetchAlerts, fetchUserReports, user]);
  
  // Separate alerts by status
  const activeAlerts = alerts.filter(alert => alert.isActive);
  const resolvedAlerts = alerts.filter(alert => !alert.isActive);
  
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor current alerts, your reports, and important information
        </p>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Alerts"
          value={activeAlerts.length}
          icon={<Bell className="h-6 w-6 text-primary-500" />}
          color="bg-primary-50 dark:bg-primary-900/20"
        />
        <StatCard
          title="Your Reports"
          value={userReports.length}
          icon={<AlertTriangle className="h-6 w-6 text-secondary-500" />}
          color="bg-secondary-50 dark:bg-secondary-900/20"
        />
        <StatCard
          title="Local Resources"
          value={5}
          icon={<Map className="h-6 w-6 text-success-500" />}
          color="bg-success-50 dark:bg-success-900/20"
        />
        <StatCard
          title="Emergency Contacts"
          value={3}
          icon={<Phone className="h-6 w-6 text-warning-500" />}
          color="bg-warning-50 dark:bg-warning-900/20"
        />
      </section>
      
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-primary-500" />
          Current Alerts
        </h2>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 mx-auto border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading alerts...</p>
          </div>
        ) : activeAlerts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {activeAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No active alerts at this time.</p>
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-secondary-500" />
          Your Emergency Reports
        </h2>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 mx-auto border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading reports...</p>
          </div>
        ) : userReports.length > 0 ? (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {userReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{report.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{report.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(report.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">You haven't submitted any reports yet.</p>
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-gray-500" />
          Recent Resolved Alerts
        </h2>
        
        {resolvedAlerts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {resolvedAlerts.slice(0, 2).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No resolved alerts to show.</p>
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Phone className="h-5 w-5 mr-2 text-warning-500" />
          Nigerian Emergency Contacts
        </h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          <ContactCard
            name="National Emergency Number"
            number="112"
            description="Police, Fire, Medical Emergency"
            isPrimary
          />
          <ContactCard
            name="NEMA Emergency"
            number="0800-CALL-NEMA"
            description="National Emergency Management Agency"
          />
          <ContactCard
            name="Nigeria Police"
            number="0805-700-0001"
            description="For security emergencies"
          />
          <ContactCard
            name="Federal Fire Service"
            number="08032003557"
            description="For fire emergencies"
          />
          <ContactCard
            name="FRSC Emergency"
            number="122"
            description="Federal Road Safety Corps"
          />
          <ContactCard
            name="NCDC"
            number="0800-9700-0010"
            description="Nigeria Centre for Disease Control"
          />
        </div>
      </section>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className={`${color} rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700`}>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
);

interface StatusBadgeProps {
  status: 'pending' | 'inProgress' | 'resolved';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let color;
  let label;
  
  switch (status) {
    case 'pending':
      color = 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300';
      label = 'Pending';
      break;
    case 'inProgress':
      color = 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300';
      label = 'In Progress';
      break;
    case 'resolved':
      color = 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300';
      label = 'Resolved';
      break;
    default:
      color = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      label = status;
  }
  
  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
      {label}
    </span>
  );
};

interface ContactCardProps {
  name: string;
  number: string;
  description: string;
  isPrimary?: boolean;
}

const ContactCard = ({ name, number, description, isPrimary }: ContactCardProps) => (
  <div className={`rounded-lg p-5 ${isPrimary ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' : 'bg-white dark:bg-gray-800'} shadow border border-gray-200 dark:border-gray-700`}>
    <h3 className={`text-lg font-semibold ${isPrimary ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
      {name}
    </h3>
    <p className="text-xl font-bold mt-2 mb-1">{number}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default DashboardPage;