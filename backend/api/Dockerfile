FROM node:22
WORKDIR /myapp
COPY package.json package-lock.json .
RUN npm install
COPY *.js .
CMD [ "node", "app.js"]