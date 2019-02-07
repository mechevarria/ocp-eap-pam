#!/bin/bash

oc project gsa

oc new-app \
--name=eap-app \
-p SOURCE_REPOSITORY_URL=https://github.com/mechevarria/ocp-eap-pam \
-p SOURCE_REPOSITORY_REF=master \
-p CONTEXT_DIR=/eap \
eap71-basic-s2i

oc set env --from=configmap/eap-config dc/eap-app
