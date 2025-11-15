import { Link } from 'react-router-dom';
import { Plus, Upload, Settings, FileText } from 'lucide-react';

const actions = [
  {
    icon: Plus,
    label: 'Create New Site',
    description: 'Start a new multilingual project',
    color: 'bg-[var(--accent-green)]',
    link: '/dashboard/new',
  },
  {
    icon: Upload,
    label: 'Import Content',
    description: 'Upload existing website content',
    color: 'bg-[var(--accent-blue)]',
    link: '/dashboard/import',
  },
  {
    icon: FileText,
    label: 'View Docs',
    description: 'Browse documentation',
    color: 'bg-[var(--accent-yellow)]',
    link: '/docs',
  },
  {
    icon: Settings,
    label: 'Settings',
    description: 'Manage account preferences',
    color: 'bg-white',
    link: '/settings',
  },
];

export function QuickActions() {
  return (
    <div className="neo-border neo-brutal-shadow-lg bg-white p-6">
      <h3 className="text-xl font-black letter-spacing-wide mb-6">Quick Actions</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.link}
              className={`neo-border neo-brutal-shadow-sm ${action.color} p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 neo-border bg-black flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold letter-spacing-wide mb-1">
                    {action.label}
                  </div>
                  <div className="text-xs text-gray-600">{action.description}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
