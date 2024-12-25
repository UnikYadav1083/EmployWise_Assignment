import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This will make your app accessible on any device in the local network.
    port: 3000         // Change to any port you prefer, e.g., 3000.
  }
})
