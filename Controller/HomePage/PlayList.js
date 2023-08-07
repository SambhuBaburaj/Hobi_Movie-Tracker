const { default: mongoose } = require("mongoose");
const { Playlistdata } = require("../../model/UserSchema");
// const fetch = require('node-fetch');
const axios = require('axios');
const Homepage = async (req, res) => {
  const User = req.session.user;

  console.log(new mongoose.Types.ObjectId(User._id));
  const playlist = await Playlistdata.find({
    UserId: new mongoose.Types.ObjectId(User._id),
  });

  res.render("HomePage", { playlistdata: playlist });
};



const AddPlaylist = (req, res) => {
  const user = req.session.user;

  if (Number(req.body.type)) {
    console.log(req.body);
    Playlistdata({
      UserId: new mongoose.Types.ObjectId(user._id),
      Name: req.body.playlist,
      public: true,
    }).save();
    res.redirect("/homepage");
  } else {
    console.log("its herre");
    console.log(req.body);
    Playlistdata({
      UserId: new mongoose.Types.ObjectId(user._id),
      Name: req.body.playlist,
      public: false,
    }).save();
    res.redirect("/homepage");
  }
};

const addingplaylist = async (req, res) => {
  const url = req.body.urldata;
  console.log(url);
  console.log(req.body);

 await axios.get(url)
    // .then((resp) => {console.log( resp.data)
    //    resp.data.json()})
    .then(async (data) => {
      const moviedatails = data.data;

      await Playlistdata.findById(
        new mongoose.Types.ObjectId(req.body.userid)
      ).then(async (data) => {
        if (data.Movies.some((obj) => obj.imdbID === moviedatails.imdbID)) {
          res.json(false);
        } else {
          await Playlistdata.findByIdAndUpdate(
            new mongoose.Types.ObjectId(req.body.userid),
            { $push: { Movies: moviedatails } },
            { new: true } // To return the updated document
          ).then((data) => {
            res.json(true);
          });
        }
      });
    });
};

module.exports = { Homepage, AddPlaylist, addingplaylist };
