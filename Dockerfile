# base image
FROM node:15.14.0

# copy files
ADD . /frontend

# default work dir
WORKDIR /frontend

# install modules
RUN npm install

# build
RUN npm run build

# caddy
FROM abiosoft/caddy

# copy files
RUN mkdir -p /www
COPY --from=0 /frontend/Caddyfile /www/Caddyfile
COPY --from=0 /frontend/build /www/public

# set default work dir
WORKDIR /www

# we use 80 for now
EXPOSE 80

# entry point
ENTRYPOINT caddy
