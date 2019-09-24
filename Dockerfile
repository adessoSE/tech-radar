# Image
FROM node:8.16-onbuild
RUN mkdir -p /src/app
WORKDIR /src/app
# COPY package.json /src/app/
# RUN npm install
COPY  ./build/ /src/app
# RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]