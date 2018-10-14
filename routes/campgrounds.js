var express     = require("express"),
    campground  = require("../models/campground"),
    router      =  express.Router({mergeParams: true}),
    middlewareObj = require("../middleware");

router.get('/', function(req, res){
   campground.find({}, function(err, campgrounds){
      if(err){
         console.log(err);
      }else{
         res.render("campgrounds/index", {campgrounds: campgrounds, page: 'campgrounds'});
      }
   });
   
});

router.post('/', middlewareObj.isLoggedIn, function(req, res){
    var title = req.body.title;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {id: req.user._id, username: req.user.username};
    var newCamp = {title: title, price: price, image: image, description: desc, author: author};
    campground.create(newCamp, function(err, newlyCampground){
       if(err){
          console.log(err);
       }else{
          console.log("A new campground is created!");
       }
    });
    req.flash("success", "A new campground is created!");
    res.redirect('/campgrounds');
});

router.get('/new', middlewareObj.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

router.get('/:id', function(req, res){

   campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err || !foundCampground){
          req.flash("error", "Campground not found");
          res.redirect('/campgrounds');
          console.log(err);
      }else{
         res.render("campgrounds/show", {campground: foundCampground});
      }
   });

});

//UPDATE ROUTES
router.get('/:id/edit', middlewareObj.checkCampgroundOwnership, function(req, res) {
    campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

router.put('/:id', middlewareObj.checkCampgroundOwnership, function(req, res){
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            console.log(err);
            //res.redirect('/:id');
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

router.delete('/:id', middlewareObj.checkCampgroundOwnership, function(req, res){
   campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
            console.log(err);
            res.redirect('/campgrounds');
       } else
             req.flash("success", "Campground successfully deleted");
            res.redirect('/campgrounds');
   }); 
});

module.exports = router;
