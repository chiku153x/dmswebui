#!/bin/bash
export APP_PROP="/usr/share/nginx/html/js/app-constant.js"
python3 env.py ${APP_PROP}
cat ${APP_PROP}
/usr/sbin/nginx -g "daemon off;"
