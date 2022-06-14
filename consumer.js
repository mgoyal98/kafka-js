const kafka = require('./kafka');
const config = require('./config');

const consumer = kafka.consumer({ groupId: 'my-js-consumer-group' });

const main = async () => {
  await consumer.connect();

  // It's possible to start from the beginning of the topic
  await consumer.subscribe({
    topics: [config.kafka.topic],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      console.log('\n\n========== Message Received ===========');
      console.log({
        topic,
        partition,
        message: {
          key: message.key.toString(),
          value: message.value.toString(),
          offset: message.offset,
          headers: message.headers,
        },
      });
      console.log('========== ======== ===========');
    },
  });
};

main();
