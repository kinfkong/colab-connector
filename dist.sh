#!/bin/bash
rm -rf dist
mkdir -p dist/colab-connector
cp *.txt *.png *.js *.html *.json dist/colab-connector
cd dist
zip -r colab-connector.zip colab-connector
cd -
