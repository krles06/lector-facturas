// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kqzlzwdnxdvcubapvmzn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtxemx6d2RueGR2Y3ViYXB2bXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDE3NjgsImV4cCI6MjA1OTk3Nzc2OH0.ZYd-VGeqkzDljxwl7Pu14tRg9c1JSRSDFBK_xA8H0gM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
