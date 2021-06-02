FROM node:14

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY ./src/ ./src/
COPY tsconfig.json swagger.yaml ./
COPY ./env/ ./env/
COPY ./logs/ ./logs/

RUN npm run build

RUN npm run rm-dev-deps

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
