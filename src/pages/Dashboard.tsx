import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data - will be replaced with real data later
  const stats = [
    {
      title: 'Total Portfolio Value',
      value: '$125,430',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Monthly Growth',
      value: '$3,250',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Active Investments',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: PieChart
    },
    {
      title: 'Risk Score',
      value: '6.8/10',
      change: '-0.3',
      trend: 'down',
      icon: Activity
    }
  ];

  const recentActivity = [
    { date: 'Today', action: 'Added AAPL to portfolio', amount: '+$2,500', type: 'buy' },
    { date: 'Yesterday', action: 'Dividend received from MSFT', amount: '+$125', type: 'dividend' },
    { date: '3 days ago', action: 'Sold TSLA shares', amount: '+$5,200', type: 'sell' },
    { date: '1 week ago', action: 'Portfolio rebalancing', amount: 'N/A', type: 'rebalance' },
  ];

  const topHoldings = [
    { symbol: 'AAPL', name: 'Apple Inc.', value: '$25,430', allocation: '20.3%', change: '+5.2%' },
    { symbol: 'MSFT', name: 'Microsoft', value: '$18,290', allocation: '14.6%', change: '+3.8%' },
    { symbol: 'GOOGL', name: 'Alphabet', value: '$15,820', allocation: '12.6%', change: '+2.1%' },
    { symbol: 'AMZN', name: 'Amazon', value: '$12,340', allocation: '9.8%', change: '-1.2%' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-deep-navy">Dashboard</h1>
        <p className="text-dark-gray mt-1">Welcome back! Here's your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-medium-gray mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-deep-navy">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-success-green mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-error-red mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-success-green' : 'text-error-red'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-light-gray rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-steel-blue" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Portfolio Performance Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-deep-navy">Portfolio Performance</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-light-gray rounded-lg hover:bg-gray-200 transition-colors">
                1M
              </button>
              <button className="px-3 py-1 text-sm bg-deep-navy text-white rounded-lg">
                3M
              </button>
              <button className="px-3 py-1 text-sm bg-light-gray rounded-lg hover:bg-gray-200 transition-colors">
                1Y
              </button>
              <button className="px-3 py-1 text-sm bg-light-gray rounded-lg hover:bg-gray-200 transition-colors">
                ALL
              </button>
            </div>
          </div>
          {/* Placeholder for chart */}
          <div className="h-64 bg-light-gray rounded-lg flex items-center justify-center">
            <Activity className="w-16 h-16 text-medium-gray" />
            <p className="ml-4 text-medium-gray">Chart will be implemented with Recharts</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-deep-navy mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-deep-navy">{activity.action}</p>
                  <p className="text-xs text-medium-gray">{activity.date}</p>
                </div>
                {activity.amount !== 'N/A' && (
                  <span className={`text-sm font-semibold ${
                    activity.type === 'sell' || activity.type === 'dividend' ? 'text-success-green' : 'text-deep-navy'
                  }`}>
                    {activity.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-steel-blue hover:text-deep-navy transition-colors">
            View All Activity →
          </button>
        </div>
      </div>

      {/* Top Holdings */}
      <div className="card">
        <h2 className="text-xl font-semibold text-deep-navy mb-4">Top Holdings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 text-sm font-medium text-medium-gray">Symbol</th>
                <th className="pb-3 text-sm font-medium text-medium-gray">Name</th>
                <th className="pb-3 text-sm font-medium text-medium-gray text-right">Value</th>
                <th className="pb-3 text-sm font-medium text-medium-gray text-right">Allocation</th>
                <th className="pb-3 text-sm font-medium text-medium-gray text-right">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {topHoldings.map((holding, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-sm font-semibold text-deep-navy">{holding.symbol}</td>
                  <td className="py-3 text-sm text-dark-gray">{holding.name}</td>
                  <td className="py-3 text-sm font-medium text-deep-navy text-right">{holding.value}</td>
                  <td className="py-3 text-sm text-dark-gray text-right">{holding.allocation}</td>
                  <td className="py-3 text-sm text-right">
                    <span className={holding.change.startsWith('+') ? 'text-success-green' : 'text-error-red'}>
                      {holding.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
