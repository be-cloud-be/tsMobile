from marcoturi/ionic
MAINTAINER be-cloud.be <info@be-cloud.be>

COPY . /app

RUN set -x; \
        cd /app \
        && ionic build

VOLUME ["/root/.gradle"]

ENTRYPOINT ["/app/entrypoint.sh"]