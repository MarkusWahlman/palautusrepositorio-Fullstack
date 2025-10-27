FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV DEBUG=playground:* PORT=3000

USER node
CMD ["npm", "run", "dev", "--", "--host"]