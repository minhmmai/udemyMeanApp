var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

// GET all reviews for a hotel
module.exports.reviewsGetAll = function (req, res) {
    var hotelId = req.params.hotelId
    console.log("GET hotelId", hotelId);

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, hotel) {
            var response = {
                status: 200,
                message: hotel
            };

            if (err) {
                console.log("Error finding hotels!");
                response.status = 500;
                response.message = {
                    "message": "Error finding hotels"
                }
            } else if (!hotel) {
                console.log("Hotel not found!");
                response.status = 400;
                response.message = {
                    "message": "Hotel not found!"
                }
            } else {
                console.log("Return hotel " + hotelId);
                var reviews = hotel.reviews;
                if (reviews) {
                    console.log("Return reviews" + reviews);
                    response.status = 200;
                    response.message = reviews
                } else {
                    console.log("No review found!");
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
    console.log("GET reviewId " + reviewId + "for hotelId " + hotelId);

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: []
            };

            if (err) {
                console.log("Error finding hotelId!");
                response.status = 500;
                response.message = {
                    "message": "Error finding hotel"
                }
            } else if (!doc) {
                console.log("hotelId not found!");
                response.status = 400;
                response.message = {
                    "message": "Hotel not found!"
                }
            } else {
                console.log("Return hotel " + hotelId);
                var review = doc.reviews.id(reviewId);
                if (review) {
                    console.log("Return review " + review);
                    response.status = 200;
                    response.message = review
                } else {
                    console.log("reviewId not found!");
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

var _addReview = function (req, res, hotel) {
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });

    hotel.save(function (err, hotelUpdated) {
        if (err) {
            console.log("Error saving hotel!");
            res
                .status(500)
                .json(err);
        } else {
            console.log(hotelUpdated.reviews[hotel.reviews.length - 1]);
            res
                .status(201)
                .json(hotelUpdated.reviews[hotel.reviews.length - 1]);
        }
    });

};

module.exports.reviewsAddOne = function (req, res) {

    var id = req.params.hotelId;

    console.log('POST review to hotelId', id);

    Hotel
        .findById(id)
        .select('reviews')
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log("HotelId not found in database", id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + id
                };
            }
            if (doc) {
                _addReview(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
        });
};

module.exports.reviewsUpdateOne = function (req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, hotel) {
            if (err) {
                console.log("Error finding hotels!");
                res.status(500)
                    .json = {
                        "message": "Error finding hotels"
                    }
            } else if (!hotel) {
                console.log("Hotel not found!");
                res.status(404)
                    .json = {
                        "message": "Hotel not found!"
                    }
            } else {
                console.log("Return hotelId " + hotelId);
                var review = hotel.reviews.id(reviewId);
                if (review) {
                    console.log("Return reviewId " + reviewId);
                    review.name = req.body.name;
                    review.rating = parseInt(req.body.rating);
                    review.review = req.body.review;
                    hotel.save(function (err, updatedReview) {
                        if (err) {
                            console.log("Error updating review");
                            res
                                .status(500)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json(updatedReview);
                            console.log("Review updated");
                        }
                    });
                } else {
                    console.log("Error finding reviewId!")
                }
            };
        });
};

module.exports.reviewsDeleteOne = function (req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, hotel) {
            if (err) {
                console.log("Error finding hotels!");
                res.status(500)
                    .json = {
                        "message": "Error finding hotels"
                    }
            } else if (!hotel) {
                console.log("Hotel not found!");
                res.status(404)
                    .json = {
                        "message": "Hotel not found!"
                    }
            } else {
                console.log("Return hotelId " + hotelId);
                var review = hotel.reviews.id(reviewId);
                if (review) {
                    console.log("Return reviewId " + reviewId);
                    hotel.reviews.id(reviewId).remove();
                    hotel.save(function (err, deletedReview) {
                        if (err) {
                            console.log("Error deleting review");
                            res
                                .status(500)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json(deletedReview);
                            console.log("Review deleted");
                        }
                    });
                } else {
                    res
                        .status(404)
                        .json = {
                            "message": "Review not found!"
                        }
                    console.log("Error finding reviewId!")
                }
            };
        });
};