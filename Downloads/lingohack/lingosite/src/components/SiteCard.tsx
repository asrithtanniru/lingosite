import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Globe, Clock, Activity, MoreVertical, Trash2, Edit, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import type { Site } from '../lib/supabase';

interface SiteCardProps {
  site: Site;
  onPublish?: (siteId: string) => void;
  onDelete?: (siteId: string) => void;
}

export function SiteCard({ site, onPublish, onDelete }: SiteCardProps) {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    await onPublish?.(site.id);
    setIsPublishing(false);
  };

  const statusConfig = {
    draft: { color: 'bg-gray-200 text-gray-800', label: 'Draft' },
    deploying: { color: 'bg-[var(--accent-blue)] text-black', label: 'Deploying' },
    live: { color: 'bg-[var(--accent-green)] text-black', label: 'Live' },
    failed: { color: 'bg-red-500 text-white', label: 'Failed' },
  };

  const status = statusConfig[site.deployment_status];

  return (
    <div className="neo-border neo-brutal-shadow-lg bg-white p-6 hover:translate-x-2 hover:translate-y-2 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 neo-border neo-brutal-shadow-sm bg-black flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold letter-spacing-wide">{site.name}</h3>
            {site.domain && (
              <p className="text-sm text-gray-600">{site.domain}</p>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="neo-border hover:bg-gray-100"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="neo-border neo-brutal-shadow-md">
            <DropdownMenuItem asChild>
              <Link to={`/dashboard/sites/${site.id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete?.(site.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4" />
          <span className="text-sm font-medium">Status:</span>
          <Badge className={`${status.color} neo-border font-bold text-xs`}>
            {status.label}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {site.languages.map((lang) => (
            <div
              key={lang}
              className={`px-3 py-1 neo-border text-xs font-bold ${
                lang === site.default_language
                  ? 'bg-[var(--accent-yellow)]'
                  : 'bg-white'
              }`}
            >
              {lang.toUpperCase()}
            </div>
          ))}
        </div>

        {site.last_deployed_at && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              Last deployed {new Date(site.last_deployed_at).toLocaleDateString()}
            </span>
          </div>
        )}

        <Button
          onClick={handlePublish}
          disabled={isPublishing || site.deployment_status === 'deploying'}
          className="w-full neo-border neo-brutal-shadow-sm bg-black text-white hover:bg-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold letter-spacing-wide"
        >
          {isPublishing || site.deployment_status === 'deploying'
            ? 'Publishing...'
            : 'Publish Site'}
        </Button>
      </div>
    </div>
  );
}
