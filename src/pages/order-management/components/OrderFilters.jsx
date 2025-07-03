import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderFilters = ({ onFilterChange, activeFilters = {} }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(activeFilters.search || '');
  const [dateRange, setDateRange] = useState({
    start: activeFilters.dateStart || '',
    end: activeFilters.dateEnd || ''
  });
  const [amountRange, setAmountRange] = useState({
    min: activeFilters.amountMin || '',
    max: activeFilters.amountMax || ''
  });
  const [selectedCategory, setSelectedCategory] = useState(activeFilters.category || '');
  const [sortBy, setSortBy] = useState(activeFilters.sortBy || 'newest');

  const filterRef = useRef(null);

  const categories = [
    'All Categories',
    'Web Development',
    'Graphic Design',
    'Content Writing',
    'Digital Marketing',
    'Video Editing',
    'Mobile Development',
    'UI/UX Design',
    'Data Entry',
    'Translation',
    'SEO Services'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'amount-high', label: 'Amount: High to Low' },
    { value: 'amount-low', label: 'Amount: Low to High' },
    { value: 'deadline', label: 'Deadline: Nearest First' },
    { value: 'status', label: 'Status' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onFilterChange({ ...activeFilters, search: value });
  };

  const handleDateRangeChange = (field, value) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    onFilterChange({
      ...activeFilters,
      dateStart: newDateRange.start,
      dateEnd: newDateRange.end
    });
  };

  const handleAmountRangeChange = (field, value) => {
    const newAmountRange = { ...amountRange, [field]: value };
    setAmountRange(newAmountRange);
    onFilterChange({
      ...activeFilters,
      amountMin: newAmountRange.min,
      amountMax: newAmountRange.max
    });
  };

  const handleCategoryChange = (category) => {
    const value = category === 'All Categories' ? '' : category;
    setSelectedCategory(value);
    onFilterChange({ ...activeFilters, category: value });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange({ ...activeFilters, sortBy: value });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setDateRange({ start: '', end: '' });
    setAmountRange({ min: '', max: '' });
    setSelectedCategory('');
    setSortBy('newest');
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (dateRange.start || dateRange.end) count++;
    if (amountRange.min || amountRange.max) count++;
    if (selectedCategory) count++;
    return count;
  };

  return (
    <div className="bg-surface border-b border-border p-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 lg:space-x-4 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            placeholder="Search orders by title, client, or order ID..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4"
          />
        </div>

        {/* Sort and Filter Controls */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none bg-background border border-border rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
            />
          </div>

          {/* Filter Toggle */}
          <div className="relative" ref={filterRef}>
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2"
            >
              <Icon name="Filter" size={16} />
              <span>Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
              <Icon name="ChevronDown" size={14} />
            </Button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg shadow-elevation-3 border border-border z-1200 animate-slide-down">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary">Filters</h3>
                    {getActiveFilterCount() > 0 && (
                      <Button variant="ghost" onClick={clearAllFilters} className="text-primary text-sm">
                        Clear all
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Date Range */}
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Date Range</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="date"
                          value={dateRange.start}
                          onChange={(e) => handleDateRangeChange('start', e.target.value)}
                          className="text-sm"
                        />
                        <Input
                          type="date"
                          value={dateRange.end}
                          onChange={(e) => handleDateRangeChange('end', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Amount Range */}
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Amount Range</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          placeholder="Min ($)"
                          value={amountRange.min}
                          onChange={(e) => handleAmountRangeChange('min', e.target.value)}
                          className="text-sm"
                        />
                        <Input
                          type="number"
                          placeholder="Max ($)"
                          value={amountRange.max}
                          onChange={(e) => handleAmountRangeChange('max', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Category</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {categories.map((category) => (
                          <label
                            key={category}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="category"
                              checked={selectedCategory === (category === 'All Categories' ? '' : category)}
                              onChange={() => handleCategoryChange(category)}
                              className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                            />
                            <span className="text-text-secondary text-sm">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="text-sm text-text-secondary">Active filters:</span>
          {searchQuery && (
            <div className="flex items-center space-x-1 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm">
              <span>Search: "{searchQuery}"</span>
              <Button
                variant="ghost"
                onClick={() => handleSearchChange({ target: { value: '' } })}
                className="p-0 h-auto hover:bg-transparent"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}
          {selectedCategory && (
            <div className="flex items-center space-x-1 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm">
              <span>{selectedCategory}</span>
              <Button
                variant="ghost"
                onClick={() => handleCategoryChange('All Categories')}
                className="p-0 h-auto hover:bg-transparent"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}
          {(dateRange.start || dateRange.end) && (
            <div className="flex items-center space-x-1 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm">
              <span>Date: {dateRange.start || '...'} - {dateRange.end || '...'}</span>
              <Button
                variant="ghost"
                onClick={() => {
                  setDateRange({ start: '', end: '' });
                  onFilterChange({ ...activeFilters, dateStart: '', dateEnd: '' });
                }}
                className="p-0 h-auto hover:bg-transparent"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}
          {(amountRange.min || amountRange.max) && (
            <div className="flex items-center space-x-1 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm">
              <span>Amount: ${amountRange.min || '0'} - ${amountRange.max || '∞'}</span>
              <Button
                variant="ghost"
                onClick={() => {
                  setAmountRange({ min: '', max: '' });
                  onFilterChange({ ...activeFilters, amountMin: '', amountMax: '' });
                }}
                className="p-0 h-auto hover:bg-transparent"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderFilters;