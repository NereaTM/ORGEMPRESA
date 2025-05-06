FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY frontend/src/ /usr/share/nginx/html/

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
