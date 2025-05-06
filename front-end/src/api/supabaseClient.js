
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xenarhixlsbkqthvbcbt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlbmFyaGl4bHNia3F0aHZiY2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNTIyNjksImV4cCI6MjA1NjkyODI2OX0.b2uULPYKCZWfvwkQjpVrB4yM7xSWxHkH5bZKXr9Ci1k'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;