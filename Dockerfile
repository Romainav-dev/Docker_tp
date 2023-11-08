FROM node:21

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port 8080
EXPOSE 8080

# Run the app
ENTRYPOINT ["node"]

CMD ["index.js"]


