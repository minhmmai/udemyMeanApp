var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;

var open = function () {
    MongoClient.connect(dburl, function (err, db) {
        const meanhotel = db.db('meanhotel');
        if (err) {
            console.log("DB connection failed");
            return;
        }
        _connection = meanhotel;
        console.log("DB connection open", meanhotel);
    });
};

var get = function () {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};                  