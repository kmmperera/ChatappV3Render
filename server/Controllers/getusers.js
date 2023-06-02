const User = require("../Models/user");


exports.getallusers=(req,res)=>{
	

	User.find({}).select("firstName lastName _id pofilePicture").exec((error,allusers)=>{
		if(error){
			
			res.status(400).json({error:"could not find users"});
		}
		if(allusers){
			
			res.status(200).json({users:allusers});
		}
		
	});
	
	
}

exports.getInbox=(req,res)=>{
	try{
	const {id} =req.body.details;
	User.find({_id:id}).select('inbox')
		.populate({path:'inbox',populate:{path:'messenger',model:'User',select:'_id firstName pofilePicture'}})
		.exec((error,result)=>{
		
		if(error){res.status(400).json({error:"could not find users"});}
		if(result){
			
			res.status(200).json({inbox:result});
		}
	});
	}
	catch(error){
		res.status(400).json({error:"something went wrong"});
		
	}
	
}


exports.changeProfilePic=(req,res)=>{
	
	const idfrombodyobj =req.body.id;
	const id=req.user._id;
	let  piclocation = req.file.location;
	try{
	User.findOneAndUpdate({_id:id}, {pofilePicture:piclocation},{new:true})
	.select("_id firstName lastName pofilePicture")
	.exec((error,result)=>{
		
		if(error){res.status(400).json({error:"could not updated pic"});}
		if(result){
			
			res.status(200).json({updatedUser:result});
		}
	});
	}
	catch(error){res.status(400).json({error:"something went wrong"});}
	
	
}


exports.getsuggestions=(req,res)=>{
	let {following,id}=req.body.details;
	following.push(id);
	try{
	User.find({_id: { $nin : following } }).select("firstName lastName _id followers pofilePicture")
	.populate("followers", "_id firstName pofilePicture")
	.exec((error,suggestions)=>{
		if(error){
			
			res.status(400).json({error:"could not find users"});
		}
		if(suggestions){
			let suggestionsobj={};
			 suggestions.forEach((s)=>{
						suggestionsobj[s._id]={...s._doc};
						 
					 });
			res.status(200).json({friendsuggestions:suggestionsobj});
		}
		
	});
	}
	catch(error){
	 
	 res.status(400).json({error:"something went wrong"})
	}
	
}


exports.userByID = (req, res) => {
    const {id}=req.body.details;
	try{
    User.find({_id:id}).select("firstName lastName following followers pofilePicture ")
    .populate('following', '_id firstName pofilePicture')
    .populate('followers', '_id firstName pofilePicture')
    .exec((error,user)=>{
			 if(error){res.status(400).json({error:"user not found"})}
			 if(user){res.status(200).json({user})}
	});
	}
	catch(error){
	 
	 res.status(400).json({error:"something went wrong"})
 }
}


exports.addToFollowingList = async(req, res, next) => {
 const {followingid,loggeduser}=req.body.details;
 try{
    await  User.findOneAndUpdate({_id:loggeduser}, {$push: {following:followingid}});
	next();
 }
 catch(error){
	 
	 res.status(400).json({error:"something went wrong"})
 }
}

exports.addToFollowersList = async(req, res) => {
 const {followingid,loggeduser}=req.body.details;
 try{
  // let result = await
   User.findOneAndUpdate({_id:followingid}, {$push: {followers:loggeduser}},{new: true})
	.select("_id firstName lastName followers pofilePicture")
	.populate("followers", "_id firstName pofilePicture")
	.exec((error,result)=>{
		 if(error){res.status(400).json({error:"user not found"})}
		 if(result){
			 let resultobj ={};
			 resultobj[result._id] ={...result._doc};
			 res.status(200).json({updatedUser:resultobj});
			 }	
	});
	
 }
 catch(error){
	 
	 res.status(400).json({error:"something went wrong"});
 }
	
    
}


exports.removeOneFromFollowingList = async(req, res, next) => {
 const {followingid,loggeduser}=req.body.details;
 try{
     await User.findOneAndUpdate({_id:loggeduser}, {$pull: {following:followingid}});
	 next();
	 }
	 catch(error){
		 res.status(400).json({error:"something went wrong step 1 "})
		 
	 }
	
}

exports.removeOneFromFollowersList = async(req, res) => {
 const {followingid,loggeduser}=req.body.details;
     try{
   //let result = await
   User.findOneAndUpdate({_id:followingid}, {$pull: {followers:loggeduser}},{new: true})
	.select("_id firstName lastName followers pofilePicture")
	.populate("followers", "_id firstName pofilePicture")
	.exec((error,result)=>{
				 if(error){res.status(400).json({error:"user not found"})}
				if(result){
			 let resultobj ={};
			 resultobj[result._id] ={...result._doc};
			 res.status(200).json({updatedUser:resultobj});
			 }	
		
	});
	
 }
 catch(error){
	 
	 res.status(400).json({error:"something went wrong"});
 }
	
    
}



