#!/bin/bash

export AWS_PROFILE=jenkins_cuentas

if [ $# -lt 1 ]; then
  echo "USAGE:  build.sh env dist_id "
  exit 1
fi

env=$1
dist_id=$2

source ~/.bashrc

nvm use 10

yarn install && yarn run build:stagging

DIST_ID=${dist_id}  node bin/invalidate.js