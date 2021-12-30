# Stage 1: build
FROM node:current-alpine3.14 as build
WORKDIR /build-dir
COPY package.json .
RUN npm install
COPY . .

# Stage 2: run
FROM node:current-alpine3.14
WORKDIR /home/node/app
COPY --from=build /build-dir ./
USER node
CMD ["npm", "start"]
