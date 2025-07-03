import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onFilterToggle, activeFiltersCount = 0, placeholder = "Search services, freelancers, or projects..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'service', text: 'React Development', category: 'Web Development' },
    { type: 'service', text: 'Logo Design', category: 'Graphic Design' },
    { type: 'service', text: 'SEO Optimization', category: 'Digital Marketing' },
    { type: 'service', text: 'Video Editing', category: 'Video & Animation' },
    { type: 'service', text: 'Content Writing', category: 'Writing & Translation' },
    { type: 'freelancer', text: 'John Doe - UI/UX Designer', category: 'Freelancer' },
    { type: 'freelancer', text: 'Sarah Smith - Full Stack Developer', category: 'Freelancer' },
    { type: 'tag', text: 'WordPress', category: 'Popular Tag' },
    { type: 'tag', text: 'E-commerce', category: 'Popular Tag' },
    { type: 'tag', text: 'Mobile App', category: 'Popular Tag' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Filter suggestions based on search query
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
      setIsSearchFocused(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleInputFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'service':
        return 'Package';
      case 'freelancer':
        return 'User';
      case 'tag':
        return 'Tag';
      default:
        return 'Search';
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-primary' : ''} rounded-lg`}>
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary z-10" 
          />
          
          <Input
            type="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            className="w-full pl-10 pr-24 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearSearch}
                className="p-1 hover:bg-surface-hover rounded-full"
              >
                <Icon name="X" size={16} className="text-text-secondary" />
              </Button>
            )}
            
            {/* Mobile Filter Button */}
            <Button
              type="button"
              variant="ghost"
              onClick={onFilterToggle}
              className="lg:hidden relative p-2 hover:bg-surface-hover rounded-lg"
            >
              <Icon name="Filter" size={16} className="text-text-secondary" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-lg shadow-elevation-3 border border-border z-1100 max-h-80 overflow-y-auto">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-surface-hover rounded-lg transition-colors text-left"
              >
                <Icon 
                  name={getSuggestionIcon(suggestion.type)} 
                  size={16} 
                  className="text-text-secondary flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {suggestion.text}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {suggestion.category}
                  </p>
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-text-muted flex-shrink-0" />
              </button>
            ))}
          </div>
          
          <div className="border-t border-border p-3">
            <button
              onClick={() => handleSearch()}
              className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-colors"
            >
              <Icon name="Search" size={16} />
              <span>Search for "{searchQuery}"</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;