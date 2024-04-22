# Use an official Node.js, and it should be version 16 and above
FROM node:20-alpine as build
# Set the working directory in the container
WORKDIR /app
# Copy package.json and pnpm-lock.yaml
COPY pnpm-lock.yaml package.json ./
# Install app dependencies using PNPM
RUN npm install -g pnpm
# Install dependencies
RUN pnpm i 
# Copy the application code 
COPY . .
# Build the TypeScript code
ENV NODE_ENV=production
RUN pnpm run build
# CMD ["pnpm", "run", "preview"]


# Stage 2: Serve the built app using Nginx
FROM nginx:alpine as webserver
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
ENV BACKEND_URL=http://127.0.0.1:5000
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]