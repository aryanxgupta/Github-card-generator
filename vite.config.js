import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all IP addresses
    port: 5173       // You can specify the port
  },
  base: "/Github-card-generator/"
  
})
