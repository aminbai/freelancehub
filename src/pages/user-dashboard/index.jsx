import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import MetricCard from './components/MetricCard';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';
import EarningsChart from './components/EarningsChart';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import PerformanceMetrics from './components/PerformanceMetrics';
import { Helmet } from 'react-helmet';

const UserDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [userRole, setUserRole] = useState('freelancer'); // freelancer or client
  const [realTimeData, setRealTimeData] = useState({
    activeOrders: 12,
    earnings: 2340,
    messages: 7,
    profileViews: 156,
    completionRate: 98.5,
    rating: 4.9,
    responseTime: '2h'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        messages: prev.messages + Math.floor(Math.random() * 2),
        profileViews: prev.profileViews + Math.floor(Math.random() * 3)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - FreelanceHub</title>
        <meta name="description" content="Your personalized dashboard for managing freelance activities and tracking performance." />
        <meta name="keywords" content="freelance dashboard, project management, earnings tracker" />
      </Helmet>

      {/* Global Header */}
      <GlobalHeader />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {/* Desktop Navigation */}
        <div className="hidden lg:block bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <PrimaryNavigation />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-text-secondary">
              <li>
                <span className="font-medium text-text-primary">Dashboard</span>
              </li>
            </ol>
          </nav>

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-text-secondary">
              Here's what's happening with your {userRole === 'freelancer' ? 'freelance business' : 'projects'} today.
            </p>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Quick Actions - Mobile First */}
            <QuickActions userRole={userRole} />

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Active Orders"
                value={realTimeData.activeOrders}
                change="+2 from last week"
                trend="up"
                icon="Package"
                color="primary"
              />
              <MetricCard
                title={userRole === 'freelancer' ? 'Earnings' : 'Spending'}
                value={`$${realTimeData.earnings.toLocaleString()}`}
                change="+12.5% from last month"
                trend="up"
                icon="DollarSign"
                color="success"
              />
              <MetricCard
                title="Messages"
                value={realTimeData.messages}
                change="3 unread"
                trend="neutral"
                icon="MessageCircle"
                color="accent"
                badge={realTimeData.messages > 0}
              />
              <MetricCard
                title="Profile Views"
                value={realTimeData.profileViews}
                change="+8% this week"
                trend="up"
                icon="Eye"
                color="secondary"
              />
            </div>

            {/* Activity Feed */}
            <ActivityFeed />

            {/* Upcoming Deadlines */}
            <UpcomingDeadlines />

            {/* Performance Metrics */}
            <PerformanceMetrics 
              userRole={userRole}
              metrics={realTimeData}
            />

            {/* Earnings Chart */}
            <EarningsChart 
              timeRange={timeRange}
              onTimeRangeChange={handleTimeRangeChange}
              userRole={userRole}
            />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Main Content */}
              <div className="col-span-8 space-y-6">
                {/* Metrics Cards */}
                <div className="grid grid-cols-4 gap-6">
                  <MetricCard
                    title="Active Orders"
                    value={realTimeData.activeOrders}
                    change="+2 from last week"
                    trend="up"
                    icon="Package"
                    color="primary"
                  />
                  <MetricCard
                    title={userRole === 'freelancer' ? 'Earnings' : 'Spending'}
                    value={`$${realTimeData.earnings.toLocaleString()}`}
                    change="+12.5% from last month"
                    trend="up"
                    icon="DollarSign"
                    color="success"
                  />
                  <MetricCard
                    title="Messages"
                    value={realTimeData.messages}
                    change="3 unread"
                    trend="neutral"
                    icon="MessageCircle"
                    color="accent"
                    badge={realTimeData.messages > 0}
                  />
                  <MetricCard
                    title="Profile Views"
                    value={realTimeData.profileViews}
                    change="+8% this week"
                    trend="up"
                    icon="Eye"
                    color="secondary"
                  />
                </div>

                {/* Earnings Chart */}
                <EarningsChart 
                  timeRange={timeRange}
                  onTimeRangeChange={handleTimeRangeChange}
                  userRole={userRole}
                />

                {/* Activity Feed */}
                <ActivityFeed expanded={true} />
              </div>

              {/* Right Column - Sidebar */}
              <div className="col-span-4 space-y-6">
                {/* Quick Actions */}
                <QuickActions userRole={userRole} />

                {/* Upcoming Deadlines */}
                <UpcomingDeadlines />

                {/* Performance Metrics */}
                <PerformanceMetrics 
                  userRole={userRole}
                  metrics={realTimeData}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <PrimaryNavigation />
      </div>
    </div>
  );
};

export default UserDashboard;