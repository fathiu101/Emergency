import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Emergency Response System
              </span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} Emergency Response. All rights reserved.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              onClick={(e) => e.preventDefault()}
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              onClick={(e) => e.preventDefault()}
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              onClick={(e) => e.preventDefault()}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;