const User = require("../Models/user");
const jwt = require("jsonwebtoken");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = (req, res) => {
	let {user: userreq}=req.body;
  User.findOne({ email: userreq.email }).exec( (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { firstname :firstName, lastname :lastName, email, password :passwords  } = userreq;
    
    const _user = new User({
      firstName,
      lastName,
      email,
      passwords
     
     
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
		  error,
        });
      }

      if (user) {
        
        const { _id, firstName, lastName, email } = user;
        return res.status(200).json({
         user,
        });
      }
    });
  });
};


exports.phonesignup = (req, res) => {
	let {user: userreq}=req.body;
  User.findOne({ email: userreq.email }).exec( (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { firstname :firstName, lastname :lastName, email, password :passwords,expoPushToken  } = userreq;
    
    const _user = new User({
      firstName,
      lastName,
      email,
      passwords,
      expoPushToken,
     
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
		  error,
        });
      }

      if (user) {
        
        const { _id, firstName, lastName, email } = user;
        return res.status(200).json({
         user,
        });
      }
    });
  });
};


exports.signin = (req, res) => {
	let {user: userreq}=req.body;
  User.findOne({ email: userreq.username }).exec( (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = userreq.password === user.passwords;
      if (isPassword ) {
        
		 const token = generateJwtToken(user._id, user.role);
		
        res.status(200).json({
         token,
          user
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};


exports.updateuser = (req, res) => {
	// let {user: userreq}=req.body;  
	//let file=req.file;

	 //let pofilePicture=req.file ? req.file.path :"uploads\\nopic.png";
	
  User.findOne({ email: req.body.email }).exec( (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = req.body.password === user.passwords;
      if (isPassword ) {
		  const { firstname :firstName, lastname :lastName, email } = req.body;
		  let update={firstName,lastName,email};
        User.findOneAndUpdate({ email: req.body.email }, update, {new: true}).exec(
		(error,updateduser)=>{
				if(error){res.status(400).json({error});}
				if(updateduser){res.status(200).json({user:updateduser});}
				});
       
      } else {
        return res.status(400).json({
          message: "username or password not correct",
        });
      }
    } else {
      return res.status(400).json({ message: "user not found" });
    }
  });
};

