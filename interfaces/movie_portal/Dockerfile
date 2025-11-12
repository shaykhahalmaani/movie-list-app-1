# syntax=docker/dockerfile:1.6

ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} AS build

WORKDIR /web
COPY package.json package-lock.json* ./
RUN npm install

COPY . .
ARG REACT_APP_MOVIE_API_URL
ENV VITE_MOVIE_API_URL=${REACT_APP_MOVIE_API_URL}
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /web/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["/docker-entrypoint.sh", "nginx", "-g", "daemon off;"]
