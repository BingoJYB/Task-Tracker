# Use an official Node as a parent image
FROM node:10.9.0

# Set the working directory to /app
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /app

# Install necessary tools
RUN npm install

# Bundle app source
COPY . /app

# Expose the port
EXPOSE 4200

# Run npm when the container launches
CMD ["npm", "start"]
