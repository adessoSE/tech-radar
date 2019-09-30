# Image
FROM node:8.16-onbuild
RUN mkdir -p /src/app
COPY  ./build/ /src/app
WORKDIR /src/app/build
# COPY package.json /src/app/
# RUN npm install
# RUN npm run build
EXPOSE 3000
# CMD ["npm", "run", "start"]