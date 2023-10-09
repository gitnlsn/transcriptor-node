#!/bin/sh

# This script is used to build docker image

cd /app/whisper.cpp
make
cp main /bin/whisper-cpp
chmod +x /bin/whisper-cpp

cd models
bash download-coreml-model.sh base
