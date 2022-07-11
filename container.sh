#!/usr/bin/env bash
if [[ -z "${D_TAG_VERSION}" ]]; then
	TAG=dmswebui:latest
else
	TAG=dmswebui:${D_TAG_VERSION}
fi
NAME=webui
docker rm -f ${NAME} || true
docker run -d --name ${NAME} \
	-p 8081:80 \
	-e DMS_REST_URL=http://localhost:8080 \
	-e DMS_UI_BASE_URL=http://localhost:8081 \
	-e DMS_FILE_SRV_URL=http://localhost:3000 \
	${TAG}

