FROM nginx

COPY default /etc/nginx/sites-available/default
WORKDIR /usr/share/nginx/html
RUN rm -f *
COPY ./app .


EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]