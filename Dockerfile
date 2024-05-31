FROM node:22

WORKDIR /opt/electro-sim
RUN corepack enable

COPY . ./
RUN yarn install

CMD yarn start