const jwt = require("jsonwebtoken");


exports.requireSignin = (req, res, next) => {
	try{
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
		if(err){  return res.status(401).json({ error: "Authorization failed" });}
		if(user){
			 req.user = user;
			next();
			
		}
	});
	
	
   
  } else {
    return res.status(401).json({ error: "Authorization required" });
  }
	}
	catch(error){    return res.status(401).json({ error: "something went wrong" });}

};