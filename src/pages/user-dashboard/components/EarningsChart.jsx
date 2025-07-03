import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EarningsChart = ({ timeRange, onTimeRangeChange, userRole }) => {
  // Mock data for different time ranges
  const chartData = {
    '7d': [
      { name: 'Mon', earnings: 120, orders: 2, spending: 85 },
      { name: 'Tue', earnings: 190, orders: 3, spending: 120 },
      { name: 'Wed', earnings: 300, orders: 4, spending: 200 },
      { name: 'Thu', earnings: 400, orders: 5, spending: 250 },
      { name: 'Fri', earnings: 200, orders: 3, spending: 150 },
      { name: 'Sat', earnings: 350, orders: 4, spending: 180 },
      { name: 'Sun', earnings: 280, orders: 3, spending: 220 }
    ],
    '30d': [
      { name: 'Week 1', earnings: 1200, orders: 15, spending: 800 },
      { name: 'Week 2', earnings: 1800, orders: 22, spending: 1200 },
      { name: 'Week 3', earnings: 2200, orders: 28, spending: 1500 },
      { name: 'Week 4', earnings: 1900, orders: 24, spending: 1300 }
    ],
    '90d': [
      { name: 'Month 1', earnings: 5200, orders: 65, spending: 3200 },
      { name: 'Month 2', earnings: 6800, orders: 78, spending: 4100 },
      { name: 'Month 3', earnings: 7500, orders: 85, spending: 4800 }
    ],
    '1y': [
      { name: 'Q1', earnings: 15200, orders: 180, spending: 9800 },
      { name: 'Q2', earnings: 18800, orders: 220, spending: 12200 },
      { name: 'Q3', earnings: 22500, orders: 265, spending: 14500 },
      { name: 'Q4', earnings: 25200, orders: 290, spending: 16800 }
    ]
  };

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const data = chartData[timeRange];
  const totalEarnings = data.reduce((sum, item) => sum + (userRole === 'freelancer' ? item.earnings : item.spending), 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const avgPerOrder = totalOrders > 0 ? (totalEarnings / totalOrders).toFixed(0) : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-success-600">
              <span className="font-medium">
                {userRole === 'freelancer' ? 'Earnings' : 'Spending'}: ${payload[0].value}
              </span>
            </p>
            <p className="text-sm text-text-secondary">
              Orders: {payload[0].payload.orders}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-lg font-semibold text-text-primary">
            {userRole === 'freelancer' ? 'Earnings' : 'Spending'} Overview
          </h3>
          <p className="text-text-secondary text-sm">
            Track your {userRole === 'freelancer' ? 'income' : 'investment'} performance over time
          </p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex items-center space-x-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onTimeRangeChange(range.value)}
              className="text-sm"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">
            ${totalEarnings.toLocaleString()}
          </p>
          <p className="text-text-secondary text-sm">
            Total {userRole === 'freelancer' ? 'Earnings' : 'Spending'}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">
            {totalOrders}
          </p>
          <p className="text-text-secondary text-sm">
            Total Orders
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">
            ${avgPerOrder}
          </p>
          <p className="text-text-secondary text-sm">
            Avg per Order
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6B7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={userRole === 'freelancer' ? 'earnings' : 'spending'}
              stroke="#1E40AF" 
              strokeWidth={3}
              dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Indicator */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Compared to previous period
          </span>
          <div className="flex items-center space-x-1 text-success-600">
            <Icon name="TrendingUp" size={14} />
            <span className="font-medium">+12.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;