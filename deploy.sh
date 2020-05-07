#!/bin/bash

yarn encore prod
mvn install
app_version=$(mvn org.apache.maven.plugins:maven-help-plugin:2.1.1:evaluate -Dexpression=project.version)
docker save resto:0.0.2 | bzip2 | pv | ssh root@restoloco.fr 'bunzip2 | docker load'  
cat deploy/docker-compose-traefik.yaml | sed -e "s/{{version}}/$app_version/" | ssh root@restoloco.fr 'echo >> deploy/docker-compose-traefik.yaml'
ssh root@restoloco.fr docker-compose -f deploy/docker-compose-traefik.yaml up -d

