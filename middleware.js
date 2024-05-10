const Listing = require("./models/listing")
const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/expressError.js");

module.exports.isLoggedin =(req,res,next) => {
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next()
}

module.exports.isOwner = async(req,res,next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this listing");
        return res.redirect(`/listings/${id}`)
    } 
    next()
}

module.exports.validateListing = (req,res,next) => {
    let {error} =  listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg)
    }
    else{
        next()
    }
}

module.exports.validateReview = (req,res,next) => {
    let {error} =  reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg)
    }
    else{
        next()
    }
}