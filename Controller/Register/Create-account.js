const mongoConnection = require("../../model/UserSchema")
const bcrypt = require("bcrypt");
// const session = require("express-session");
// const client = require("twilio")(
//   process.env.ACCOUNT_SID,
//   process.env.AUTH_TOKEN
// );
// const MongoCategory = require("./")
// const MongoWallet = require("../Connections/UserSchema").UserWallet;
// const MongoUserData = require("../Connections/UserSchema").user_data;
// const MongoCart = require("../Connections/UserSchema").CartData;

const CreateAccount = async (req, res) => {
console.log(req.body);
  const duplicate = await mongoConnection.user_data.findOne({
    email: req.body.user_email,
  });
console.log(duplicate);
  if (duplicate) {
    res.render("login", {
      duplicate: "email already exist",

    });
  } else {
    const secure_password = async (password) => {
        try {
          const password_hash = await bcrypt.hash(password, 10);
          return password_hash;
        } catch (error) {
          console.log(error);
        }
      };
      
    const hashed = await secure_password(req.body.user_password);
console.log(req.body);
    const new_user = new mongoConnection.user_data({ 
      username: req.body.user_name,
      email: req.body.user_email,
      password: hashed,
      phone: req.body.Phone,
      isBlocked: 0,
      date: new Date(),
    });
    new_user.save().then((s,e)=>
    {
        console.log(s);
    });

    res.render("login", {
      logout: "account created",
    });
  }
};
module.exports = { CreateAccount };
