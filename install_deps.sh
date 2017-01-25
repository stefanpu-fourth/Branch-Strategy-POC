#!/bin/bash

SHA1SUM=sha1sum

if [ "$(uname)" = "Darwin" ]
then
  if hash gsha1sum 2>/dev/null;
  then
    SHA1SUM=gsha1sum
  else
    echo "Please install gsha1sum (brew install coreutils)"
    exit 1
  fi
fi

RUN_NPM=true
RUN_BOWER=true

$SHA1SUM -c package.json.sha1 --status --strict
if [ $? -eq 0 ]
then
  echo "package.json unchanged"
  RUN_NPM=false
else
  echo "recalculating package.json checksum"
  $SHA1SUM package.json > package.json.sha1
fi

if $RUN_NPM = true
then
  echo "updating npm deps"
  rm -rf node_modules/
  npm install
fi

$SHA1SUM -c bower.json.sha1 --status --strict
if [ $? -eq 0 ]
then
  echo "bower.json unchanged"
  RUN_BOWER=false
else
  echo "recalculating bower.json checksum"
  $SHA1SUM bower.json > bower.json.sha1
fi

if [ $RUN_BOWER = true ]
then
  echo "updating bower deps"
  rm -rf bower_components/
  bower install
fi
