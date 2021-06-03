FROM node:alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000
RUN touch bigbuck.mp4
CMD [ "yarn","start" ]