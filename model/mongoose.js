const mongoose = require("mongoose");



require("dotenv").config();
const url = process.env.URL;
// const url="mongodb://localhost:27017/people"
mongoose.connect(url).then(() => {
    console.log("connection success");
  })
  .catch((err) => console.log(err));
  