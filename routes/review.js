const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedin,isOwner} = require("../middleware.js");
const reviewConstroller = require("../controllers/review.js")



// Reviews 
router.post(
    "/",
    isLoggedin,
    validateReview,
    wrapAsync(reviewConstroller.createReview)
);

// Delete Review Route
router.delete(
    "/:reviewId",
    isLoggedin,
    isOwner,
    wrapAsync(reviewConstroller.destroyReview)
); 

module.exports = router;