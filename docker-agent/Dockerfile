FROM node:8.16-onbuild
RUN curl -fsSLO https://get.docker/builds/Linux/x86_64/docker-19.03.1-ce.tgz \
    && tar xzvf docker-19.03.1-ce.tgz \
    && mv docker/docker /usr/local/bin \
    && rm -r docker docker-19.03.1-ce.tgz