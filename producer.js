const kafka = require('./kafka');
const config = require('./config');

const producer = kafka.producer();

const main = async () => {
  await producer.connect();
  const message = await producer.send({
    topic: config.kafka.topic,
    messages: [{ value: 'Hello KafkaJS user!' }],
  });
  console.log('\n\n========== Message Produced ===========');
  console.log(message);
  console.log('========== ======== ===========');
  await producer.disconnect();
};

main();
