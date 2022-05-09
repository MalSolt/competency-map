FROM node:12

WORKDIR /app/server
COPY package.json yarn.lock ./

RUN yarn

COPY ./ .

CMD ["yarn", "dev"]
