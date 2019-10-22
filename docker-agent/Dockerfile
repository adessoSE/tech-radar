FROM node:8.16-onbuild

# Need Xvfb
RUN apt-get update --yes
RUN apt-get install --yes xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
# Need Cypress itself
# RUN npm set progress=false
# RUN npm i -g cypress-cli@0.14.0
# ARG CYPRESS_VERSION
# ENV CYPRESS_VERSION ${CYPRESS_VERSION:-0.16.4}
# RUN echo Cypress version to install $CYPRESS_VERSION
# RUN cypress install
# RUN cypress verify