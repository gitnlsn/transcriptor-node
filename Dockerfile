FROM node:20-alpine
ENV DIR=/app
WORKDIR ${DIR}
COPY . ${DIR}

# Install infra tools
RUN apk update
RUN apk add shadow build-base git coreutils wget curl bash ffmpeg jq
RUN apk add --update util-linux
RUN git clone https://github.com/gitnlsn/whisper.cpp.git
# RUN mv /usr/bin/wget /usr/bin/wget2
RUN sh scripts/install-whisper-cpp.sh
# RUN mv /usr/bin/wget2 /usr/bin/wget

RUN wget -O ggml-base.bin "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin"

RUN yarn
RUN npx tsc

CMD node dist/main.js
