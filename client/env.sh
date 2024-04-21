#!/bin/sh
# Replace the placeholder in the Nginx configuration file with the backend URL
sed -i "s|{{BACKEND_URL}}|${BACKEND_URL}|g" /etc/nginx/conf.d/default.conf