FROM ghcr.io/gleam-lang/gleam:v1.4.1-erlang-alpine

COPY . /build/

RUN apk add --no-cache build-base

# Compile the project
RUN cd /build \
    && gleam export erlang-shipment \
    && mv build/erlang-shipment /app \
    && rm -r /build

# Run the server
WORKDIR /app
ENTRYPOINT ["/app/entrypoint.sh"]
EXPOSE 4020

CMD ["run"]
