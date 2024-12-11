# Use a Node.js base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Expose the application's port
EXPOSE 4000

# Start the application
CMD ["node", "server.js"]
