var campground = require("../models/campground"),
    Comment    = require("../models/Comment");
    
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You have to be logged in");
    res.redirect('/login');
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id, function(err, foundcampground){
            if(err || !foundcampground){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                if(foundcampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error", "You have to be logged in");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error", "You have to be logged in");
        res.redirect("back");
    }
}


module.exports = middlewareObj;