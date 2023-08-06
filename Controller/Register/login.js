const mongoConnection = require("../../model/UserSchema")
const session = require("express-session");
const bcrypt = require("bcrypt");

const login=async (req,res)=>
{
  
    console.log(req.body);
    const username = req.body.user_name;
    const password = req.body.user_password;


const CheckName = await mongoConnection.user_data.findOne({ email: username })

    console.log(CheckName);
if (CheckName) {

  const PasswordMatch = await bcrypt.compare(password, CheckName.password);
  if (PasswordMatch) {
    req.session.user =CheckName;  
   console.log('here');
console.log(req.session.returnto);
res.redirect("/homepage")
  } else {
    res.render("login", {user: req.session.user,
      title: "express",
      duplicate: "email/password is incorrect"
    });
  } 
} else { 
    console.log('itshere');
  res.render("login", {
  
    duplicate: "email/password is incorrect",

  });
}


}
module.exports={login}