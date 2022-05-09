FROM node:12

WORKDIR /app/client
COPY package.json yarn.lock ./

RUN yarn

COPY ./ .

CMD ["yarn", "dev"]
