const SessionCheck=(req,res,next)=>
{
    if (req.session.user) {
        next()
      } else {
        res.render("login", { title: "Express" });
      }

}
module.exports={SessionCheck}