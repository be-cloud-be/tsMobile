from marcoturi/ionic
MAINTAINER be-cloud.be <info@be-cloud.be>

COPY . /app

RUN find /app

VOLUME ["/root/.gradle"]

ENTRYPOINT ["/app/entrypoint.sh"]