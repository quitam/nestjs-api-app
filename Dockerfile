FROM node:20.11.1

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Run prisma:dev:deploy
RUN ls -la

# Build the app
# RUN yarn build

# Expose port
EXPOSE 5000

USER node

# Start the app
# CMD ["yarn", "start"]