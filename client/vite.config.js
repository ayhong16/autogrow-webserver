import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';

export default ({ mode }) => {
  dotenv.config({ path: `./.env.${mode}` });
  // now you can access config with process.env.{configName}

  const apiURL =  process.env.VITE_API_URL;

  console.log('API URL:', apiURL);

  return defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port : 3000,
        proxy: {
          '/api': {
              target: apiURL,
              changeOrigin: true,
              secure: false,
          }
        }
    },
  })
}