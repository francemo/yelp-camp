var express       = require("express"),
   app            = express(),
   bodyParser     = require("body-parser"),
   mongoose       = require("mongoose"),
   passport       = require("passport"),
   localStrategy  = require("passport-local"),
   methodOverride = require("method-override"),
   flash          = require("connect-flash"),
   seedDB         = require("./seed.js"),
   campground     = require("./models/campground"),
   Comment        = require("./models/Comment"),
   User           = require("./models/user");
   
var campgroundsRoutes = require("./routes/campgrounds"),
    commentsRoutes   = require("./routes/comments"),
    indexRoutes      = require("./routes/index");
   
//connect to database
mongoose.connect("mongodb://localhost:27017/yelp_camp_v9", {useNewUrlParser: true}); //
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash());

//PASPORT CONFIGURATION
app.use(require("express-session")({
   secret: "lovely me",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/campgrounds", campgroundsRoutes);
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

//seedDB();


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server started!"); 
});