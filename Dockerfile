FROM node:9.2.0 AS node

COPY src /usr/local/src/hpctv/src/
COPY static /usr/local/src/hpctv/static/
COPY build /usr/local/src/hpctv/build/
COPY config /usr/local/src/hpctv/config/
COPY dist /usr/local/src/hpctv/dist/

COPY package*.json index.html .babelrc .editorconfig .eslintignore .eslintrc.js .postcssrc.js /usr/local/src/hpctv/

WORKDIR /usr/local/src/hpctv

RUN npm install
RUN npm run build

FROM nginx:1.13.7-alpine AS nginx

LABEL repo=cisl-repo \
      name=hpctv \
      version=1.0

COPY --from=node /usr/local/src/hpctv/dist /usr/share/nginx/html/
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

VOLUME /run/secrets
