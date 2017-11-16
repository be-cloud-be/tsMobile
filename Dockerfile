from marcoturi/ionic
MAINTAINER be-cloud.be <info@be-cloud.be>

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]