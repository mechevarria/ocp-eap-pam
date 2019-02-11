#!/bin/bash

# prefixing project with user to allow multiple people building the same project on the same cluster
oc project gsa

oc new-app https://github.com/mechevarria/ocp-eap-pam \
--context-dir=angular \
--name=angular-app

