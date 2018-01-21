var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// GET all reviews for a hotel
module.exports.reviewsGetAll = function (req, res) {
    var hotelId = req.params.hotelId
    console.log('GET hotelId', hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function (err, hotel) {
            var response = {
                status: 200,
                message: hotel
            };

            if (err) {
                console.log('Error finding hotels!');
                response.status(400);
                response.message = {
                    "message": "Error finding hotels"
                }
            } else if (!hotel) {
                console.log('Hotel not found!');
                response.status = 400;
                response.message = {
                    "message": "Hotel not found!"
                }
            } else {
                console.log('Return hotel ' + hotelId);
                var reviews = hotel.reviews;
                if (reviews) {
                    console.log('Return reviews' + reviews);
                    response.status = 200;
                    response.message = reviews
                } else {
                    console.log('No review found!');
                    response.status = 200;
                    response.message = {
                        "message": "No review found!"
                    }
                }
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

//GET one review for a hotel
module.exports.reviewsGetOne = function (req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('GET reviewId ' + reviewId + 'for hotelId ' + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function (err, hotel) {
            var response = {
                status: 200,
                message: hotel
            };

            if (err) {
                console.log('Error finding hotels!');
                response.status(400);
                response.message = {
                    "message": "Error finding hotels"
                }
            } else if (!hotel) {
                console.log('Hotel not found!');
                response.status = 400;
                response.message = {
                    "message": "Hotel not found!"
                }
            } else {
                console.log('Return hotel ' + hotelId);
                var review = hotel.reviews.id(reviewId);
                if (review) {
                    console.log('Return review ' + review);
                    response.status = 200;
                    response.message = review
                } else {
                    console.log('Review not found!');
                    response.status = 200;
                    response.message = {
                        "message": "Review not found!"
                    }
                }
            }
            res
                .status(response.status)
                .json(response.message);
        });
};