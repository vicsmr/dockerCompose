var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var amqp = require('amqplib/callback_api');
var mongoClient = require("mongodb").MongoClient;

app.use(express.static('public'));
app.use(express.json());

var task;
var userWs;
var amqpChannel;
var server = "mongodb://dbMongo:27017/db";

amqp.connect('amqp://hxjcmzey:e_fK-MuEAOM_iAPEjOXy_2-sb-X-s3uo@shark.rmq.cloudamqp.com/hxjcmzey', async function (err, conn) {

    amqpChannel = await conn.createChannel();

    console.log("Connected to RabbitMQ");

    await amqpChannel.assertQueue('tasksProgress');
    await amqpChannel.assertQueue('newTasks');

    amqpChannel.consume('tasksProgress', function (msg) {

        var message = JSON.parse(msg.content.toString());

        console.log("Message received: " + JSON.stringify(message));

        sendWs(message);

    }, { noAck: true });

});

function sendWs(message) {
    if (!!userWs) {
        userWs.send(JSON.stringify(message));
    }
}

async function processTask() {

    if (!amqpChannel) {
        console.error("Not connected to RabbitMQ");
    } else {

        var newTask = {
            id: task.id,
            text: task.text
        }

        amqpChannel.sendToQueue("newTasks", Buffer.from(JSON.stringify(newTask)));
    }

}

app.route('/tasks/:id')
    .get(function (req, res, next) {

        if (!!task && req.params.id == task.id) {
            res.send(task);
        } else {
            res.status(404).end();
        }

    }).delete(function (req, res) {

        if (!!task && req.params.id == task.id) {
            res.send(task);
            task = undefined;
        } else {
            res.status(404).end();
        }
    });

app.post('/tasks/', function (req, res) {

    if (!!task) {
        res.status(409).send('Tasks already created');
    } else {

        task = {
            id: 1,
            text: req.body.text,
            progress: 0,
            completed: false
        }

        connectDB(task);

        res.status(201).send(task);

        processTask();
    }

})

function connectDB(task) {
    mongoClient.connect(server, function (error, database) {
        if (error)
            console.log("Error while connecting to database: ", error);
        else
            console.log("Connection established successfully");
        
        var db = database.db("db");

        var tasks = db.collection("tasks");
        
        tasks.insertOne(task, function(error, result){
            if(error)
                console.log("Error: ", error);
            else
            console.log("Document inserted.");
        });

        database.close();
    });
}

app.ws('/taskProgress', async function (ws, req) {
    console.log('User connected');
    userWs = ws;
});

app.listen(8081);