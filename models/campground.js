var mongoose    = require("mongoose");

//make campground schema
var campgroundSchema = new mongoose.Schema({
   title: String,
   image: String,
   description: String,
   price: String,
   author:{
      id: {type: mongoose.Schema.Types.ObjectId},
      username: String
   },
   comments: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }]
});

//compile to a db model
module.exports = mongoose.model("campground", campgroundSchema);
