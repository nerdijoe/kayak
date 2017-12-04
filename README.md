# kayak 🚣‍


## How to run the application 🏃‍

### 1. Start Kafka Broker 

```
// on your terminal, go to your respective kafka folder
$ cd kafka_2.11-0.11.0.1


// start zookeper
$ bin/zookeeper-server-start.sh config/zookeeper.properties


// start kafka server
$ bin/kafka-server-start.sh config/server.properties


// create 2 topics
// request_topic and response_topic
$ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic request_topic
$ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic


// see the topics that has been created
$ bin/kafka-topics.sh --list --zookeeper localhost:2181

```

### 2. Start Redis Server
```
// download redis package and install
$ wget http://download.redis.io/releases/redis-4.0.4.tar.gz
$ tar xzf redis-4.0.4.tar.gz
$ cd redis-4.0.4
$ make
 run Redis server
//
$ ./src/redis-server
```

## How to deploy


### Server Express.js
```
// git clone the project
$ cd server
$ npm install

// migrate MySQL database
$ sequelize db:migrate

$ npm start

```

### Kayak Client React.js
```
$ cd kayak-client
$ npm install
$ npm start
```

### Admin Client React.js
**Use admin-client-v2, this admin client is running on localhost:3009**
```
$ cd admin-client-v2
$ npm install
$ npm start
```



```
copy the .env key values from Trello on Reference List

```
