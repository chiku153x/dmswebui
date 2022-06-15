#!/usr/bin/env bash
TAG=dmswebui:latest
NAME=webui
docker rm -f ${NAME} || true
docker run -d --name ${NAME} \
	-p 8081:80 \
	-e DMS_REST_URL=http://localhost:8080 \
	${TAG}

