from marcoturi/ionic
MAINTAINER be-cloud.be <info@be-cloud.be>

RUN set -x; \
        mkdir -p /root/.ionic

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm install && npm cache clean
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

COPY entrypoint.sh /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]