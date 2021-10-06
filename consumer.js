const amqp = require('amqplib');;
const connect = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('jobs');
        channel.consume('jobs', message => {
            console.log(`Received job: ${message.content.toString()}`);
            channel.ack(message);
        });
        console.log('Waiting for message...');
    } catch (ex) {
        console.error(ex);
    }
}

connect();
