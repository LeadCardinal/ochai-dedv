import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://inlanltghistyetrlprg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlubGFubHRnaGlzdHlldHJscHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3OTAwMDQsImV4cCI6MjA4MzM2NjAwNH0.pzffijtgopVNhuLvp_505EgKVk15v2kQ0oE-W2FDTSQ';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
