import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart, 
  AlertTriangle, 
  BookOpen, 
  FileText, 
  User 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <SidebarItem to="/" icon={<Home />} label="Home" />
          {/* <SidebarItem to="/dashboard" icon={<BarChart />} label="Dashboard" /> */}
          <SidebarItem to="/guidelines" icon={<BookOpen />} label="Safety Guidelines" />
          <SidebarItem to="/report" icon={<AlertTriangle />} label="Report Emergency" exact />
          <SidebarItem to="/profile" icon={<User />} label="Profile" />
        </ul>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}

const SidebarItem = ({ to, icon, label, exact }: SidebarItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        end={exact}
        className={({ isActive }) => 
          `flex items-center p-3 rounded-lg transition-colors ${
            isActive 
              ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`
        }
      >
        <div className="w-6 h-6 mr-2 flex items-center justify-center">{icon}</div>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
