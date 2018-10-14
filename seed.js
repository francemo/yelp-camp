var mongoose = require("mongoose");
var campground = require("./models/campground");
var Comment = require("./models/Comment");

var data =[
        { 
            title: 'Sumner Lake State Park',
            image: 'https://www.campsitephotos.com/photo/camp/24622/feature_Sumner_Lake-f3.jpg',
            description: 'Sumner Lake State Park offers many activities, such as camping, hiking, swimming, wildlife viewing and fishing. The lake is home for many warm water species including walleye, bass, crappie, and channel catfish.'
            
        },
        { 
            title: 'Quail Creek State Park',
            image: 'https://www.campsitephotos.com/photo/camp/16351/Quail_Creek_State_Park_001.jpg',
            description: 'Quail Creek Reservoir (590 acres) is an attractive reservoir situated beneath red rock cliff walls. Quail Creek State Park along its southwestern shore offers a paved boat ramp, picnic area, swimming beach and a modern campground. The reservoir yields rainbow trout, bass and blue gill.'
            
        },
        {
            title: 'Lake Success',
            image: 'https://www.campsitephotos.com/photo/camp/60195/Lake_Success_View_1.jpg',
            description: 'Tule Lake Recreation Area campground has 104 single family campsites (many with electric hookups) and is located on the northeastern shore of Success Lake in the foothills of the Sierra Nevada mountains. The campground is open year-round and has drinking water, flush toilets, hot showers and a sanitation dump station to die for.  Each campsite has a table, fire ring and grill. There are some trees in the campground that provide a little shade to some of the campsites.  There are lots of outdoor recreational activities at Tule Lake Recreation Area including boating, canoeing, kayaking, fishing, water skiing, jet skiing, hiking, biking, hunting and wildlife viewing. There’s also a playground, picnic area and boat ramps at the facility. Campfire programs are all the rage on Saturday nights during the summer.'
            
        }
    ];
    
function seedDB(){
    campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
         }
        //else{
        //     data.forEach(function(camp){
        //         campground.create(camp, function(err, camp){
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 console.log("created new campground!");
        //                 Comment.create({
        //                     text: "This place is great.",
        //                     author:  "Home"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     }else{
        //                         camp.comments.push(comment);
        //                         camp.save(function(err, camp){
        //                             if(err){
        //                                 console.log(err);
        //                             }else{
        //                                 console.log("Added the first comment!");
        //                             }
        //                         })
        //                     }
        //                 });
        //             }
        //         });
        //     });
        //  }
    });
}

module.exports = seedDB;