var mongoose = require('mongoose');
var Loc = mongoose.model('Location');


var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.locationsListByDistance = function (req, res) {
	sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.locationsCreate = function (req, res) {
	sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.locationsReadOne = function (req, res) {

	if (req.params && req.params.locationid) {
		Loc.findById(req.params.locationid)
			.exec(function(err, location) {
				//not found
				if(!location){
					sendJSONresponse(res, 404, {"message" : req.params.locationid +" not found"});	
					return;
				//something went wrong
				}else if(err){
					sendJSONresponse(res, 404, err);	
					return;						
				}
				sendJSONresponse(res, 200, location);
			});
	}else{
		sendJSONresponse(res, 404, {"message" : "No locationid in request"});		
	}
};

module.exports.locationsUpdateOne = function (req, res) {
	sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.locationsDeleteOne = function (req, res) {
	sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.reviewsCreate = function (req, res) {
	sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.reviewsReadOne = function (req, res) {
	if (req.params && req.params.locationid && req.params.reviewid) {
		Loc
			.findById(req.params.locationid)
			.select('name reviews')
			.exec(function(err, location) {
				var response, review;
				if (!location) {
					sendJSONresponse(res, 404, {"message": "locationid not found"});
					return;
				} else if (err) {
					sendJSONresponse(res, 400, err);
					return;
				}
				if (location.reviews && location.reviews.length > 0) {
					review = location.reviews.id(req.params.reviewid);
					if (!review) {
						sendJSONresponse(res, 404, {"message": "reviewid not found"});
					} else {
						response = {
							location : {
								name : location.name,
								id : req.params.locationid
							},
							review : review
						};
						sendJSONresponse(res, 200, response);
					}
				} else {
					sendJSONresponse(res, 404, {"message": "No reviews found"});
				}
			}
		);
	} else {
		sendJSONresponse(res,404,{"message":"Not found, locationid and reviewid are both required"});
	}
};

module.exports.reviewsUpdateOne = function (req, res) {
	sendJSONresponse(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne = function (req, res) {
	sendJSONresponse(res, 200, {"status" : "success"});
};



