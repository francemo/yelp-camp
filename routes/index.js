var express  = require("express"),
    router   = express.Router({mergeParams: true}),
    User     = require("../models/user"),
    passport = require("passport");


router.get('/', function(req, res){
   res.render("landing")
});


router.get('/register', function(req, res) {
    res.render("register", {page: 'register'});
})

router.post('/register', function(req, res) {
   var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
          console.log(err);
          req.flash("error", err.message);
          return res.redirect('/register');
       }
       passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to YelpCamp" + user.username);
          res.redirect('/campgrounds');
       })
    })
})

//LOGIN ROUTE
router.get('/login', function(req, res) {
    res.render("login", {page: 'login'});
});

router.post('/login', passport.authenticate("local", {
   successRedirect: '/campgrounds',
   failureRedirect: '/login'
}), function(req, res){});

//LOGOUT ROUTE
router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect('/campgrounds');
});

module.exports = router;