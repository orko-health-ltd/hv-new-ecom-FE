# Use Node 18 Alpine image
FROM node:18-bullseye


# Set working directory
WORKDIR /app

# Install necessary tools and PM2
RUN apt-get update && apt-get install -y bash && npm install -g pm2


# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Build the Nuxt app with memory flag
ENV NODE_OPTIONS=--max-old-space-size=4084
RUN npm run build

# Expose Nuxt port
EXPOSE 3000

# Run using PM2 (with Nuxt production mode)
CMD ["pm2-runtime", "start", "node_modules/nuxt/bin/nuxt.cjs", "--", "start"]
