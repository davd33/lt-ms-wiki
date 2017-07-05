FROM ubuntu:trusty

# Install latest node + python
RUN apt-get -qq update
RUN apt-get -qq -y install wget xz-utils python make g++ git
RUN wget -O /node-v7.10.0-linux-x64.tar.xz "https://nodejs.org/dist/v7.10.0/node-v7.10.0-linux-x64.tar.xz"
RUN tar xf /node-v7.10.0-linux-x64.tar.xz
RUN rm -rf /node-v7.10.0-linux-x64.tar.xz
RUN mv /node-v7.10.0-linux-x64 /node
RUN ln -s /node/bin/node /usr/bin/node
RUN ln -s /node/bin/npm /usr/bin/npm

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "run", "start" ]