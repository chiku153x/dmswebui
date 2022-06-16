FROM nginx:1.16-alpine
USER root
RUN apk add --no-cache --update python3
COPY default /etc/nginx/sites-available/default
WORKDIR /usr/share/nginx/html
RUN rm -f *
COPY ./app .
COPY ./conf/app-constant.js /usr/share/nginx/html/js
RUN mkdir -p doc/demo/23/2021545
RUN chmod -R 777  doc/demo/23/2021545
COPY img.jpeg doc/demo/23/2021545
COPY test3.pdf doc/demo/23/2021545

EXPOSE 80/tcp

WORKDIR /opt/app
COPY ./setup.sh .
COPY ./env.py .

#CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
CMD ["sh","./setup.sh"]