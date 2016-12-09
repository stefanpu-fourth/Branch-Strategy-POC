# ESS Ember Docker Image using: fourth-ember:v2.8.0

FROM fourthdockerpoc/fourth-ember:v2.8.0

ARG NPM_TOKEN

RUN mkdir /app

WORKDIR /app

COPY . /app

# install dependencies then run 'npm rebuild node-sass'
# to make sure node-sass bindings are in place
RUN npm install --legacy-bundling \
  && bower --allow-root install \
	&& npm rebuild node-sass

RUN rm -f /app/.npmrc

# ember server on port 4200
EXPOSE 4200

# live-reload on port 49152
EXPOSE 49152

CMD ["ember", "test"]
