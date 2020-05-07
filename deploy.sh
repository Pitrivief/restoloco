#!/bin/bash

yarn encore prod
mvn install
app_version=`mvn org.apache.maven.plugins:maven-help-plugin:2.1.1:evaluate -Dexpression=project.version | grep -ve "^\[INFO\]"`
echo "APP_VERSION=$app_version"
docker save resto:$app_version | bzip2 | pv | ssh root@restoloco.fr 'bunzip2 | docker load'  
cat deploy/docker-compose-traefik.yaml | sed -e "s/resto:{{version}}/resto:$app_version/" | ssh root@restoloco.fr 'echo >> deploy/docker-compose-traefik.yaml'
ssh root@restoloco.fr docker-compose -f deploy/docker-compose-traefik.yaml up -d

