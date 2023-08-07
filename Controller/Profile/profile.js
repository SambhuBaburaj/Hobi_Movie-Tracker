
const { default: mongoose } = require("mongoose");
const { Playlistdata } = require("../../model/UserSchema");

const Profile=async (req,res)=>
{
    const user=req.session.user

    
const play=await Playlistdata.find({ UserId: new mongoose.Types.ObjectId(user._id) })


res.render("Profile", { playlist: play,user:user});
 
}
const removeMovie=async(req,res)=>
{
 await Playlistdata.findByIdAndUpdate(
        req.query.param1,
        { $pull: { Movies: { imdbID: req.query.param2 } } },
        { new: true },
     
      ).then(s=>
        {
            console.log(s);
        }).catch(err=>
            {
                console.log(err);
            })
    console.log(req.query);
    res.redirect('/profile')
}



module.exports={Profile,removeMovie}    