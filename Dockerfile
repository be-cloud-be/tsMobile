from marcoturi/ionic
MAINTAINER be-cloud.be <info@be-cloud.be>

COPY . /app

VOLUME ["/root/.gradle"]

ENTRYPOINT ["cd /app; ionic serve --lab"]