var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function (req, res) {
    console.log('GET the hotels');
    console.log(req.query);

    if (req.query && req.query.offset && req.query.count) {
        offset = parseInt(req.query.offset, 10);
        count = parseInt(req.query.count, 10);
        var returnData = hotelData.slice(offset, offset + count);        
    } else {
        var returnData = hotelData;
    };
    
    res
        .status(200)
        .json(returnData);
};

module.exports.hotelsGetOne = function (req, res) {
    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId];

    console.log('GET hotelId', hotelId);
    res
        .status(200)
        .json(thisHotel);
};

module.exports.hotelsAddOne = function (req, res) {
    console.log('POST new hotel');
    console.log(req.body);
    res
        .status(200)
        .json(req.body);
};