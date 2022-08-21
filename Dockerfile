FROM node:18
WORKDIR /usr/app
COPY package.json .
RUN npm install
RUN npm uninstall bcrypt
RUN npm i bcrypt
COPY . .