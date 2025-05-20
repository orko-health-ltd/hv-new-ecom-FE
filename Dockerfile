# Use Node 18 official image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Nuxt app
ENV NODE_OPTIONS=--max-old-space-size=4084
RUN npm run build

# Expose port 3000 (default Nuxt port)
EXPOSE 3000

# Run the Nuxt server
CMD ["npm", "run", "start"]
