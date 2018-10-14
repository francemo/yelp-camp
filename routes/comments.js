var express     = require("express"),
    campground  = require("../models/campground"),
    Comment     = require("../models/Comment"),
    router      =  express.Router({mergeParams: true}),
    middlewareObj = require("../middleware");

//NEW COMMENT ROUTE
router.get('/new', middlewareObj.isLoggedIn, function(req, res){
   campground.findById(req.params.id, function(err, camp){
      if(err){
         console.log(err);
      }else{
         res.render('comments/new', {campground: camp});
      }
   })
   
});

router.post('/', middlewareObj.isLoggedIn, function(req, res){
   campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
      }else{
         Comment.create(req.body.comment, function(err, comment){
            if(err){
               console.log(err);
            }else{
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
            }
            
         });
      }
   });
});

//EDIT COMMENT ROUTE
router.get('/:comment_id/edit', middlewareObj.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
         res.redirect("back");
      }else{
         res.render("comments/edit", {id: req.params.id, comment: foundComment});
      }
   });

});

router.put('/:comment_id', middlewareObj.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
      if(err){
         res.redirect("back");
      }else{
         res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

//DELETE ROUTE
router.delete('/:comment_id', middlewareObj.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
         res.redirect("back");
      }else{
         req.flash("success", "Comment successfully deleted!");
         res.redirect("/campgrounds/" + req.params.id);
      }
   })
})

module.exports = router;
