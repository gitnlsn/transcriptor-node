#!/bin/sh

# This script is used to build docker image

cd /app/whisper.cpp
make
cp main /bin/whisper-cpp
chmod +x /bin/whisper-cpp

# bash models/download-coreml-model.sh base
# cp /app/whisper.cpp/models/ggml-base.bin /etc/ggml-base.bin
