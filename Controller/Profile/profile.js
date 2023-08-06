
const { default: mongoose } = require("mongoose");
const { Playlistdata } = require("../../model/UserSchema");

const Profile=async (req,res)=>
{
    const user=req.session.user

    
const play=await Playlistdata.find({ UserId: new mongoose.Types.ObjectId(user._id) })


res.render("Profile", { playlist: play,user:user});
 
}
module.exports={Profile}  