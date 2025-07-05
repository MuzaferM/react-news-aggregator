# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Create .env file with API keys for accessing news APIs
# These keys are required to fetch data from the external sources
RUN echo "VITE_NEWSAPI_ORG_API_KEY=ad1546fb3d09484f8444c45fc82d9a11" >> .env && \
    echo "VITE_GUARDIAN_NEWS_API_KEY=5daa70a9-0ccb-4562-980c-deb5f302f278" >> .env && \
    echo "VITE_NY_TIMES_API_KEY=fB8KTzZ7zwKKfXHDif87F8ZiOxJIZehE" >> .env

# Leverage Docker's caching by installing dependencies first (from package.json and package-lock.json)
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Now copy the rest of the application source code into the container
# and build the React app for production
COPY . ./
RUN npm run build

# Stage 2: Development environment
FROM node:18-alpine AS development
WORKDIR /app

# Copy the .env file created in the build stage to the development stage
# This ensures that the environment variables (API keys) are available for the development server
COPY --from=build /app/.env ./.env

# Install dependencies again for the development environment
# This step is necessary as we are setting up a separate container for development
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the full source code into the development container
COPY . ./

# Expose port 5173 for the development server (used by Vite, if you're using Vite for dev server)
# This makes the development app accessible on localhost:5173
EXPOSE 5173

# Set the default command to run the development server (e.g., using npm run dev)
# This starts the app in development mode, enabling features like hot-reloading
CMD ["npm", "run", "dev"]

# Stage 3: Production environment
FROM nginx:alpine AS production

# Copy the production build artifacts (from the build stage) to the appropriate directory in the Nginx container
# This makes the optimized static files available for serving by Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for serving the production app
# This makes the production app accessible on localhost (default HTTP port 80)
EXPOSE 80

# Set the default command to start Nginx in the foreground
# This keeps the container running and serves the React app via Nginx
CMD ["nginx", "-g", "daemon off;"]
