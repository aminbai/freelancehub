import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const SearchInterface = ({ 
  onSearch, 
  placeholder = "Search services, freelancers, or projects...",
  showFilters = true,
  className = "" 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  const searchRef = useRef(null);
  const filterRef = useRef(null);

  const searchSuggestions = [
    { type: 'service', text: 'Web Design', category: 'Design' },
    { type: 'service', text: 'Logo Design', category: 'Design' },
    { type: 'service', text: 'WordPress Development', category: 'Development' },
    { type: 'service', text: 'Content Writing', category: 'Writing' },
    { type: 'freelancer', text: 'John Smith - UI/UX Designer', category: 'Freelancer' },
    { type: 'freelancer', text: 'Sarah Johnson - Developer', category: 'Freelancer' },
  ];

  const filterOptions = [
    { id: 'category', label: 'Category', options: ['Design', 'Development', 'Writing', 'Marketing', 'Video'] },
    { id: 'budget', label: 'Budget', options: ['$5-$25', '$25-$100', '$100-$500', '$500+'] },
    { id: 'delivery', label: 'Delivery Time', options: ['24 hours', '3 days', '1 week', '2+ weeks'] },
    { id: 'rating', label: 'Rating', options: ['4.5+ stars', '4+ stars', '3.5+ stars'] },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery, selectedFilters);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    onSearch?.(suggestion.text, selectedFilters);
  };

  const handleFilterToggle = (filterId, option) => {
    const filterKey = `${filterId}:${option}`;
    setSelectedFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`relative ${className}`}>
      {/* Main Search Bar */}
      <div ref={searchRef} className="relative">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary z-10" 
            />
            <Input
              type="search"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => {
                setIsExpanded(true);
                if (searchQuery.length > 0) setShowSuggestions(true);
              }}
              className={`w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                isExpanded ? 'shadow-soft' : ''
              }`}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface-hover rounded"
              >
                <Icon name="X" size={16} className="text-text-secondary" />
              </Button>
            )}
          </div>
        </form>

        {/* Search Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface rounded-lg shadow-elevation-3 border border-border z-1200 animate-slide-down">
            <div className="py-2 max-h-64 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-surface-hover transition-colors duration-200 text-left"
                >
                  <Icon 
                    name={suggestion.type === 'freelancer' ? 'User' : 'Briefcase'} 
                    size={16} 
                    className="text-text-secondary flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary font-medium truncate">{suggestion.text}</p>
                    <p className="text-text-secondary text-sm">{suggestion.category}</p>
                  </div>
                  <Icon name="ArrowUpRight" size={14} className="text-text-muted flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex items-center space-x-3 mt-3">
          <div className="relative" ref={filterRef}>
            <Button
              variant="outline"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center space-x-2"
            >
              <Icon name="Filter" size={16} />
              <span>Filters</span>
              {selectedFilters.length > 0 && (
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedFilters.length}
                </span>
              )}
              <Icon name="ChevronDown" size={14} />
            </Button>

            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-surface rounded-lg shadow-elevation-3 border border-border z-1200 animate-slide-down">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary">Filters</h3>
                    {selectedFilters.length > 0 && (
                      <Button variant="ghost" onClick={clearFilters} className="text-primary text-sm">
                        Clear all
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {filterOptions.map((filter) => (
                      <div key={filter.id}>
                        <h4 className="font-medium text-text-primary mb-2">{filter.label}</h4>
                        <div className="space-y-2">
                          {filter.options.map((option) => {
                            const filterKey = `${filter.id}:${option}`;
                            const isSelected = selectedFilters.includes(filterKey);
                            return (
                              <label
                                key={option}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleFilterToggle(filter.id, option)}
                                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                                />
                                <span className="text-text-secondary text-sm">{option}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active Filters */}
          {selectedFilters.length > 0 && (
            <div className="flex items-center space-x-2 flex-wrap">
              {selectedFilters.map((filter) => {
                const [category, value] = filter.split(':');
                return (
                  <div
                    key={filter}
                    className="flex items-center space-x-1 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    <span>{value}</span>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedFilters(prev => prev.filter(f => f !== filter))}
                      className="p-0 h-auto hover:bg-transparent"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInterface;