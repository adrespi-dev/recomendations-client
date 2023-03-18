# official node image
FROM node:14.17.6-alpine3.13

WORKDIR /app

# app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

RUN yarn global add serve

COPY . ./

RUN yarn build

# start app
# CMD ["http-server", "build"]
