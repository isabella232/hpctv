FROM node:11.2 AS node

COPY src /usr/local/src/hpctv/src/
COPY static /usr/local/src/hpctv/static/
COPY build /usr/local/src/hpctv/build/
COPY config /usr/local/src/hpctv/config/
COPY dist /usr/local/src/hpctv/dist/

COPY package*.json index.html .babelrc .editorconfig .eslintignore .eslintrc.js .postcssrc.js /usr/local/src/hpctv/

WORKDIR /usr/local/src/hpctv

RUN npm install
RUN npm run build

FROM nginx:1.15-alpine AS nginx

RUN apk --update add dumb-init

COPY --from=node /usr/local/src/hpctv/dist /usr/share/nginx/html/
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

VOLUME /run/secrets

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]
