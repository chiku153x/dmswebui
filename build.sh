#!/usr/bin/env bash
if [[ -z "${D_TAG_VERSION}" ]]; then
	TAG=dmswebui:latest
else
	TAG=dmswebui:${D_TAG_VERSION}
fi
docker build -t ${TAG} .
