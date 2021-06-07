FROM node:16

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY ./src/ ./src/
COPY tsconfig.json swagger.yaml ./
COPY ./env/ ./env/
COPY ./logs/ ./logs/

RUN npm run build

RUN rm -rf node_modules src tsconfig.json

RUN npm i --production

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
