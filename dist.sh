#!/bin/bash
rm -rf dist
mkdir -p dist/src
cp *.txt *.png *.js *.html dist/src
cd dist
zip colab-connector.zip src
cd -
