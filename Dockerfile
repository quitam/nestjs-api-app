FROM node:20.11.1

# Create app directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

# Build the app
RUN yarn build

# Expose port
EXPOSE 5000

# Start the app
CMD ["yarn", "start"]