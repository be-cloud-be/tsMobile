from marcoturi/ionic
MAINTAINER be-cloud.be <info@be-cloud.be>

COPY . /app

VOLUME ["/root/.gradle"]

VOLUME ["/app/node_modules"]

RUN set -x; \
        cd /app \
        && npm install

ENTRYPOINT ["/app/entrypoint.sh"]