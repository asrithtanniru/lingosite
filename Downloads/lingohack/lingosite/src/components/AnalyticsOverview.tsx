import { TrendingUp, Users, Globe, Eye } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
}

function AnalyticsCard({ title, value, change, icon: Icon, trend }: AnalyticsCardProps) {
  return (
    <div className="neo-border neo-brutal-shadow-md bg-white p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 neo-border bg-black flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div
          className={`px-2 py-1 text-xs font-bold ${
            trend === 'up'
              ? 'bg-[var(--accent-green)]'
              : 'bg-red-200'
          }`}
        >
          {change}
        </div>
      </div>
      <div className="text-3xl font-black letter-spacing-wide mb-1">{value}</div>
      <div className="text-sm text-gray-600 letter-spacing-wide">{title}</div>
    </div>
  );
}

export function AnalyticsOverview() {
  const stats = [
    {
      title: 'Total Visitors',
      value: '24.5K',
      change: '+12.5%',
      icon: Users,
      trend: 'up' as const,
    },
    {
      title: 'Page Views',
      value: '156K',
      change: '+8.2%',
      icon: Eye,
      trend: 'up' as const,
    },
    {
      title: 'Languages Active',
      value: '12',
      change: '+2',
      icon: Globe,
      trend: 'up' as const,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.4%',
      icon: TrendingUp,
      trend: 'up' as const,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <AnalyticsCard key={index} {...stat} />
      ))}
    </div>
  );
}
