# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies using npm
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project (excluding files in .dockerignore)
COPY . .

# Expose any required ports (Metro Bundler runs on 8081)
EXPOSE 8081

# Start the Metro Bundler when the container runs
CMD ["npm", "start"]
