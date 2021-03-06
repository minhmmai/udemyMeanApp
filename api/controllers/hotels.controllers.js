var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

var runGeoQuery = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    //A geoJSON point
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        maxDistance: 2000,
        num: 5
    };

    Hotel
        .geoNear(point, geoOptions, function (err, results, stats) {
            var response = {
                status: 200,
                message: results
            };
            if (err) {
                console.log("Error finding coordinates!");
                response.status = 500;
                response.message = err;
            } else {
                console.log("Geo results ", results);
                console.log("Geo stats ", stats);
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

module.exports.hotelsGetAll = function (req, res) {

    var offset = 0;
    var count = 0;
    var maxCount = 50;

    if (req.query && req.query.lng && req.query.lat) {
        runGeoQuery(req, res);
        return;
    };

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    };

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    };

    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message": "If supplied in query string, offset & count should be numbers"
            });
        return;
    };

    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message": "Count limit of " + maxCount + " exceeded"
            });
        return;
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, hotels) {
            if (err) {
                console.log("Error finding hotels!");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found hotels ", hotels.length);
                res
                    .json(hotels);
            }
        });
};

module.exports.hotelsGetOne = function (req, res) {

    var hotelId = req.params.hotelId;
    console.log("GET hotelId ", hotelId);

    Hotel
        .findById(hotelId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding hotelId");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log("hotelId not found!")
                response.status = 404;
                response.message = {
                    "message": "Hotel not found!"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });
};

var _splitArray = function (input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
}

module.exports.hotelsAddOne = function (req, res) {
    Hotel
        .create({
            name: req.body.name,
            description: req.body.description,
            stars: parseInt(req.body.stars, 10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                address: req.body.address,
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            }
        }, function (err, hotel) {
            if (err) {
                console.log("Error creating hotel");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Hotel created" + hotel);
                res
                    .status(201)
                    .json(hotel);
            }
        });
};

module.exports.hotelsUpdateOne = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);

    Hotel
        .findById(hotelId)
        .select("-reviews -rooms")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding hotels");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log("hotelId not found!")
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name;
                doc.description = req.body.description;
                doc.stars = parseInt(req.body.stars, 10);
                doc.services = _splitArray(req.body.services);
                doc.photos = _splitArray(req.body.photos);
                doc.currency = req.body.currency;
                doc.location = {
                    address: req.body.address,
                    coordinates: [
                        parseFloat(req.body.lng),
                        parseFloat(req.body.lat)
                    ]
                };
                doc.save(function (err, updatedHotel) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                        console.log("Error updating hotel");
                    } else {
                        res
                            .status(204)
                            .json(updatedHotel);
                        console.log("Hotel updated!");
                    }
                });
            }

        });
};

module.exports.hotelsDeleteOne = function (req, res) {
    var hotelId = req.params.hotelId;
    Hotel
        .findByIdAndRemove(hotelId)
        .exec(function (err, hotel) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("hotelId " + hotelId + " deleted!");
                res
                    .status(204)
                    .json = {
                        "message": "Hotel deleted!"                    
                    };
            }
        });
};

