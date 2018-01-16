var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection err ' + err);
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected though app termination (SIGINT)');
        process.exit(0);
    });
});
process.on('SIGTERM', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected though app termination (SIGTERM)');
        process.exit(0);
    });
});
process.once('SIGURS2', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected though app termination (SIGUSR2)');
        process.kill(process.pid, 'SIGUSR2');
    });
});

//Bring in schemas and models
require('./hotels.model.js');

