const kafka = require('./kafka');
const config = require('./config');

const producer = kafka.producer();

const main = async () => {
  await producer.connect();
  for (let i = 0; i < 10; i++) {
    const message = await producer.send({
      topic: config.kafka.topic,
      messages: [{ key: `id_${i}`, value: `Hello KafkaJS user! id_${i}` }],
    });
    console.log('\n\n========== Message Produced ===========');
    console.log(message);
    console.log('========== ======== ===========');
  }
  await producer.disconnect();
};

main();
