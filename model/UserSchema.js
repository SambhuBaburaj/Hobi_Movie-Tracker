const mongoose=require("mongoose");
const User_Schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone:Number,
    isBlocked:Number,
    date:Date
  });
  const user_data = mongoose.model("user_data", User_Schema);
  const Playlist=new mongoose.Schema({
    UserId: mongoose.ObjectId,
   
      Name:String,
      Movies:Array,
     
    public:Boolean
    
    
    })

    const Playlistdata=mongoose.model("playlist",Playlist)



    module.exports={user_data,Playlistdata}