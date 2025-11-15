import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Site {
  id: string;
  name: string;
  domain: string | null;
  languages: string[];
  default_language: string;
  deployment_status: 'draft' | 'deploying' | 'live' | 'failed';
  last_deployed_at: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}
