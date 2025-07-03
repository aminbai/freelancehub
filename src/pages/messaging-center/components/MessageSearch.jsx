import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const MessageSearch = ({ searchQuery, onSearchChange }) => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState({
    participant: '',
    project: '',
    dateRange: 'all',
    messageType: 'all'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      participant: '',
      project: '',
      dateRange: 'all',
      messageType: 'all'
    });
    onSearchChange('');
  };

  const hasActiveFilters = searchQuery || Object.values(filters).some(value => 
    value !== '' && value !== 'all'
  );

  return (
    <div className="space-y-4">
      {/* Basic Search */}
      <div className="relative">
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
        />
        <Input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
        >
          <Icon name="Filter" size={14} className="text-text-secondary" />
        </Button>
      </div>

      {/* Advanced Search */}
      {isAdvancedSearch && (
        <div className="bg-surface-hover rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-text-primary text-sm">Advanced Filters</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAdvancedSearch(false)}
              className="p-1"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Participant Filter */}
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Participant
              </label>
              <Input
                type="text"
                placeholder="Search by name..."
                value={filters.participant}
                onChange={(e) => handleFilterChange('participant', e.target.value)}
                className="text-sm"
              />
            </div>

            {/* Project Filter */}
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Project
              </label>
              <Input
                type="text"
                placeholder="Search by project..."
                value={filters.project}
                onChange={(e) => handleFilterChange('project', e.target.value)}
                className="text-sm"
              />
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Message Type Filter */}
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Message Type
              </label>
              <select
                value={filters.messageType}
                onChange={(e) => handleFilterChange('messageType', e.target.value)}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread Only</option>
                <option value="attachments">With Attachments</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-text-secondary">
              {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
                disabled={!hasActiveFilters}
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="text-xs"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-text-secondary">Active filters:</span>
          <div className="flex items-center space-x-1">
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-50 text-primary-600">
                "{searchQuery}"
                <button 
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:text-primary-700"
                >
                  <Icon name="X" size={10} />
                </button>
              </span>
            )}
            {Object.entries(filters).map(([key, value]) => {
              if (value && value !== 'all') {
                return (
                  <span key={key} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-50 text-secondary-600">
                    {key}: {value}
                    <button 
                      onClick={() => handleFilterChange(key, key === 'dateRange' || key === 'messageType' ? 'all' : '')}
                      className="ml-1 hover:text-secondary-700"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageSearch;