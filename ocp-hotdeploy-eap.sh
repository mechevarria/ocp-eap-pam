#!/usr/bin/env bash

# https://docs.okd.io/latest/dev_guide/copy_files_to_container.html

pod_name=$(oc get pods --selector app=eap-app | { read line1 ; read line2 ; echo "$line2" ; } | awk '{print $1;}')

# directory on pod
deploy_dir=/deployments

# exploded war directory
target_dir=$(pwd)/eap/target/

# war file to transfer
war_file=jboss-api.war

oc rsync ${target_dir} ${pod_name}:${deploy_dir} --exclude=* --include=${war_file} --no-perms --watch
