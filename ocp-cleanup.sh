#!/bin/bash

oc project gsa
oc delete all --selector app=eap-app
oc delete dc/mysql
oc delete all --selector name=mysql
oc delete service mysql
oc delete configmap eap-config
oc delete secret mysql
