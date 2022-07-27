FROM node

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install
RUN npm install --save pm2
RUN npm run build

EXPOSE 57898
CMD ["npm", "run", "start"]