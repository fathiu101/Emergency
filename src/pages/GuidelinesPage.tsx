import React, { useEffect, useState } from 'react';
import { useGuidelinesStore } from '../stores/guidelinesStore';
import GuidelineCard from '../components/GuidelineCard';
import { BookOpen, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const GuidelinesPage = () => {
  const { categories, guidelines, fetchCategories, fetchGuidelines, isLoading } = useGuidelinesStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchCategories();
    fetchGuidelines();
  }, [fetchCategories, fetchGuidelines]);
  
  useEffect(() => {
    if (selectedCategory) {
      fetchGuidelines(selectedCategory);
    } else {
      fetchGuidelines();
    }
  }, [selectedCategory, fetchGuidelines]);
  
  const filteredGuidelines = searchTerm
    ? guidelines.filter(g => 
        g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.steps.some(step => step.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : guidelines;
  
  // Function to get Lucide icon dynamically by name
  const getLucideIcon = (iconName: string) => {
    // @ts-ignore - Accessing dynamic property
    const Icon = LucideIcons[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    return Icon ? <Icon className="h-6 w-6" /> : <BookOpen className="h-6 w-6" />;
  };
  
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Safety Guidelines</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Follow these guidelines to stay safe during various emergency situations
        </p>
      </header>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search guidelines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      {!searchTerm && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`text-left p-5 rounded-lg shadow-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 dark:border-primary-700'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {getLucideIcon(category.icon)}
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </button>
          ))}
        </section>
      )}
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {searchTerm 
              ? 'Search Results' 
              : selectedCategory 
                ? `${categories.find(c => c.id === selectedCategory)?.title} Guidelines` 
                : 'All Guidelines'
            }
          </h2>
          
          {(selectedCategory || searchTerm) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchTerm('');
              }}
              className="text-sm text-secondary-600 dark:text-secondary-400 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 mx-auto border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading guidelines...</p>
          </div>
        ) : filteredGuidelines.length > 0 ? (
          <div className="space-y-4">
            {filteredGuidelines.map((guideline) => (
              <GuidelineCard key={guideline.id} guideline={guideline} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm 
                ? 'No guidelines match your search. Try different keywords.' 
                : 'No guidelines found for this category.'
              }
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default GuidelinesPage;