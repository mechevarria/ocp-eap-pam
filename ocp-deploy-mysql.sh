#!/bin/bash

oc project "gsa"

echo "Creating mysql database"

db_service=mysql
db_name=jboss
db_user=myuser
db_pass=mypass

oc new-app \
--name=mysql \
-p MYSQL_USER=${db_user} \
-p MYSQL_PASSWORD=${db_pass} \
-p MYSQL_DATABASE=${db_name} \
-p DATABASE_SERVICE_NAME=${db_service} \
mysql-persistent

oc create configmap eap-config \
--from-literal=DB_CONNECTION_URL=jdbc:mysql:\/\/mysql\/${db_name} \
--from-literal=DB_USERNAME=${db_user} \
--from-literal=DB_PASSWORD=${db_pass}
