# Use official Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy dependency files first (layer caching)
COPY package.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application code
COPY src ./src

# App listens on 3000
EXPOSE 3000

# Start the service
CMD ["npm", "start"]

