import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, Phone } from 'lucide-react';
import { useEmergencyStore } from '../stores/emergencyStore';

const HomePage = () => {
  const { alerts, fetchAlerts, isLoading } = useEmergencyStore();
  const [newsReports, setNewsReports] = useState<any[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const activeAlerts = alerts.filter((alert) => alert.isActive);

  const fetchNewsReports = async () => {
    setIsNewsLoading(true);
    try {
      const res = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_b94d2f9f6eef44c48f49fe6fe6e211bd&country=ng&language=en&q=flood OR fire OR epidemic OR outbreak OR emergency`
      );
      const data = await res.json();
      setNewsReports(data.results || []);
    } catch (err) {
      console.error('Failed to fetch news:', err);
    } finally {
      setIsNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsReports();
    const interval = setInterval(fetchNewsReports, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

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

      {/* Emergency News Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Latest Emergency News in Nigeria
        </h2>

        {isNewsLoading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 mx-auto border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading emergency news...</p>
          </div>
        ) : newsReports.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {newsReports.slice(0, 6).map((report, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow bg-white dark:bg-gray-900"
              >
                <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                  {report.title.length > 100 ? report.title.slice(0, 100) + '...' : report.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(report.pubDate).toLocaleDateString()} — {report.source_id || 'Newsdata'}
                </p>
                <a
                  href={report.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block text-sm"
                >
                  Read full article →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No recent news available.</p>
        )}
      </section>

      {/* Info Cards */}
      <section className="grid gap-6 md:grid-cols-3">
        <QuickInfoCard
          title="Emergency Contacts"
          icon={<Phone className="h-8 w-8 text-primary-500" />}
          description="Access important Nigerian emergency phone numbers and contact information."
          link=""
          linkText=""
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
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Phone className="h-5 w-5 mr-2 text-warning-500" />
          Nigerian Emergency Contacts
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <ContactCard name="National Emergency Number" number="112" description="Police, Fire, Medical Emergency" isPrimary />
          <ContactCard name="NEMA Emergency" number="0800-CALL-NEMA" description="National Emergency Management Agency" />
          <ContactCard name="Nigeria Police" number="0805-700-0001" description="For security emergencies" />
          <ContactCard name="Federal Fire Service" number="08032003557" description="For fire emergencies" />
          <ContactCard name="FRSC Emergency" number="122" description="Federal Road Safety Corps" />
          <ContactCard name="NCDC" number="0800-9700-0010" description="Nigeria Centre for Disease Control" />
        </div>
      </section>
    </div>
  );
};

const QuickInfoCard = ({
  title,
  icon,
  description,
  link,
  linkText,
  color,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  linkText: string;
  color: string;
}) => {
  return (
    <div className={`rounded-lg p-6 ${color} border border-gray-200 dark:border-gray-700`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
      {link && (
        <Link
          to={link}
          className="text-secondary-600 dark:text-secondary-400 font-medium hover:underline"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};

const ContactCard = ({
  name,
  number,
  description,
  isPrimary,
}: {
  name: string;
  number: string;
  description: string;
  isPrimary?: boolean;
}) => (
  <div
    className={`rounded-lg p-5 ${
      isPrimary ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' : 'bg-white dark:bg-gray-800'
    } shadow border border-gray-200 dark:border-gray-700`}
  >
    <h3
      className={`text-lg font-semibold ${
        isPrimary ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-white'
      }`}
    >
      {name}
    </h3>
    <p className="text-xl font-bold mt-2 mb-1">{number}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default HomePage;
