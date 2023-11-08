# FROM node:21

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json .
# COPY index.js .

# RUN npm install

# # Bundle app source
# COPY . .

# # Expose port 8080
# EXPOSE 8080

# # Run the app
# ENTRYPOINT ["node"]

# CMD ["index.js"]

# ---------------------------------------------------------------------------------------------

FROM node:14

# Créez le répertoire de l'application
WORKDIR /usr/src/app

# Copiez le fichier package.json et le fichier package-lock.json s'ils existent
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez tous les fichiers de l'application
COPY . .

# Exposez le port sur lequel l'application écoute (correspond au port dans votre index.js)
EXPOSE 3000

# Commande de démarrage de l'application
CMD ["node", "index.js"]
