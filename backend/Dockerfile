# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the TypeScript configuration file to the working directory
COPY tsconfig.json .

# Copy the source code to the working directory
COPY src/ src/

# Compile the TypeScript code to JavaScript
RUN npm run build

# Expose the port the app will run on
EXPOSE 5000

# Start the application
CMD ["node", "dist/app.js"]