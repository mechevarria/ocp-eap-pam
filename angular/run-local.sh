#!/usr/bin/env bash

export PORT=4200
export EAP="http://eap-app-gsa.apps.ocp.integration.redhatgov.io"
export KIE="http://rhpam7-install-kieserver-gsa.apps.ocp.integration.redhatgov.io"
export SCALE="https://lease-inventory-3scale-apicast-production.apim.apps.ocp.integration.redhatgov.io"

npm run start
