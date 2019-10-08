# # Image
# FROM node:8.16-onbuild
# RUN mkdir -p /src/app
# COPY  ./build/ /src/app
# WORKDIR /src/app/build
# # COPY package.json /src/app/
# # RUN npm install
# # RUN npm run build
# EXPOSE 3000
# # CMD ["npm", "run", "start"]

FROM alpine

RUN apk add --update npm
RUN npm install http-server -g

RUN mkdir -p /src/app
COPY  ./build /src/app
WORKDIR /src/app

CMD ["http-server", "./build", "-p", "80"]

EXPOSE 80