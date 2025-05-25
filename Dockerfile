# Step 1: Use Node base image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

#Step 5: Start microservice
CMD ["npm", "run", "start:dev"]