import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
     tailwindcss(),
  ],
  server: {
    host: true,        // allows access from other devices (LAN)
    port: 5173,        // you can change this if needed
    open: true         // automatically opens browser
  }
})
