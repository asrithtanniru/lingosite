import { Activity, CheckCircle, Globe, Upload } from 'lucide-react';

interface ActivityItem {
  type: 'deploy' | 'update' | 'translation' | 'visit';
  message: string;
  timestamp: string;
  site?: string;
}

const activities: ActivityItem[] = [
  {
    type: 'deploy',
    message: 'Site deployed successfully',
    timestamp: '2 minutes ago',
    site: 'My Portfolio',
  },
  {
    type: 'translation',
    message: 'Translation completed for Spanish',
    timestamp: '15 minutes ago',
    site: 'E-Commerce Store',
  },
  {
    type: 'update',
    message: 'Content updated on homepage',
    timestamp: '1 hour ago',
    site: 'Corporate Website',
  },
  {
    type: 'visit',
    message: '500+ visitors from France',
    timestamp: '2 hours ago',
    site: 'My Portfolio',
  },
  {
    type: 'deploy',
    message: 'New version published',
    timestamp: '3 hours ago',
    site: 'Blog Platform',
  },
];

const activityIcons = {
  deploy: Upload,
  update: CheckCircle,
  translation: Globe,
  visit: Activity,
};

export function RecentActivity() {
  return (
    <div className="neo-border neo-brutal-shadow-lg bg-white p-6">
      <h3 className="text-xl font-black letter-spacing-wide mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          return (
            <div
              key={index}
              className="flex items-start space-x-4 pb-4 border-b-2 border-gray-100 last:border-b-0 last:pb-0"
            >
              <div className="w-8 h-8 neo-border bg-black flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm letter-spacing-wide truncate">
                  {activity.message}
                </p>
                {activity.site && (
                  <p className="text-xs text-gray-600 mt-1">{activity.site}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
