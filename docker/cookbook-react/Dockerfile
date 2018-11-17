FROM nginx

ARG COOKBOOK_PATH=build/

RUN sed -i 's/    location \/ {/    location \/ {\n        try_files $uri $uri\/ \/index.html;/g' /etc/nginx/conf.d/default.conf

COPY $COOKBOOK_PATH /usr/share/nginx/html/
