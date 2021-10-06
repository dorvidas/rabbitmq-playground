const amqp = require('amqplib');
const msg = {number: process.argv[2]};
const connect = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('jobs');
        channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)));
        console.log(`Job send succesfully ${msg.number}`);
    } catch (ex) {
        console.error(ex);
    }
}

connect();
