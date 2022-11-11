#!/usr/bin/env bash

TAG=chiku153/dmsui:v.023
#TAG=synchrorkkk/dmsui:v.009

docker buildx build --platform=linux/amd64,linux/arm64 -t ${TAG}  ${tag} --push .