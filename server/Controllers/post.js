const Post = require("../Models/post");

//create, remove,edit,getById
exports.create = (req, res) => {
	let {post}=req.body;
	try{
	const _post =new Post(post);
  _post.save( (error, postsdb) => {
    if (error) return res.status(400).json(error );
    if (postsdb) {
		let postobj={};
		postobj[postsdb._id]={...postsdb._doc};
            return res.status(200).json({posts : postobj,postid:postsdb._id});

    } else {
		let error ={ error: "could not save the post" };
      return res.status(400).json(error);
    }
  });
  
	}
   catch(error){res.status(400).json({error:"something went wrong"});}

};


exports.getpostbyuser = (req, res) => {
	let {user}=req.body;
	try {
  Post.find({postedBy:user.id})
  .populate('postedBy', '_id firstName pofilePicture')
  .populate({path:'comments',populate:{path:'postedBy',model:'User',select:'_id firstName pofilePicture'}})
  .sort('-created')
  .exec((error,dbposts)=>{
	  
	  if(error){return res.status(400).json(error);}
	 if(dbposts){ 
	 
	 let postsobj={};
	 dbposts.forEach((p)=>{
		 postsobj[p._id] = {
		 _id : p._id,
		 text : p.text,
		 photo : p.photo,
		 likes : p.likes,
		 comments : p.comments,
		 postedBy : p.postedBy,
		 created : p.created,
		 };
		 
	 });
	 return res.status(200).json({postsobj});
	 }
	  
	  
	 
	  
  });
	}
   catch(error ){return res.status(400).json(error);}
};

exports.postByID = (req, res) => {
 const {id} =req.body.details;
 try{
     Post.find({_id:id}).populate('postedBy', '_id firstName pofilePicture').exec((error,result)=>{
	if(error){ res.status(400).json({error: "Post not found"});}
	if(result){
	//	let postbd ={};
	//	postbd[result._id] ={...result._doc};
		
		res.status(200).json({post:result});
		
		}
	});
 }
   catch(error){res.status(400).json({error:"something went wrong"});}

 }

exports.getNewsFeed = (req, res) => {
  const{ following,loggeduser } = req.body.details ;
  try{
  following.push(loggeduser );
 
   Post.find({postedBy: { $in :following } })
						.populate({path:'comments',populate:{path:'postedBy',model:'User',select:'_id firstName pofilePicture'}})
                       // .populate('comments.postedBy', '_id firstName')
                         .populate('postedBy', '_id firstName pofilePicture')
                         .sort('-created')
                          .exec((error,result)=>{
				if(error){ res.status(400).json({error:"could not get feed"});}
				if(result){ 
				let feedobj={};
					 result.forEach((r)=>{
						feedobj[r._id]={...r._doc};
						 
					 });

				res.status(200).json({feed:feedobj});
				
				}

			});
			
  }
     catch(error){res.status(400).json({error:"something went wrong"});}

}

exports.deletePost = (req, res) => {
  const {postId} = req.body.details;
  try {
	Post.findOneAndDelete({_id:postId}).exec((error,result)=>{
		if(error){ res.status(400).json({error:"could not delete"});}
		if(result){
		//	let deletedobj ={};
		//deletedobj[result._id] ={...result._doc};
			res.status(200).json({deletedPost:result});
			}
	});
  }
       catch(error){res.status(400).json({error:"something went wrong"});}

}


exports.like = (req, res) => {
  const {postId,userId} = req.body.details;
  try{
    Post.findOneAndUpdate({_id:postId}, {$push: {likes:userId}}, {new: true})
			.populate({path:'comments',populate:{path:'postedBy',model:'User',select:'_id firstName pofilePicture'}})
            .populate('postedBy', '_id firstName pofilePicture')
			.exec((error,result)=>{
			if(error){res.status(400).json({error:"could not find the post"});}
			if(result){
				let lkpost={};
				lkpost[result._id]={...result._doc};
				res.status(200).json({likedPost:lkpost});
				
				}

	});
  }
  catch(error){res.status(400).json({error:"something went wrong"});}
}

exports.unlike = (req, res) => {
  const {postId,userId} = req.body.details;
  try{
    Post.findOneAndUpdate({_id:postId}, {$pull: {likes:userId}}, {new: true})
	.populate({path:'comments',populate:{path:'postedBy',model:'User',select:'_id firstName pofilePicture'}})
    .populate('postedBy', '_id firstName pofilePicture')
	.exec((error,result)=>{
			if(error){res.status(400).json({error:"could not find the post"});}
			if(result){
				let unlikedobj={};
				unlikedobj[result._id]={...result._doc};
				res.status(200).json({unlikedPost:unlikedobj});
				}

	});
  }
         catch(error){res.status(400).json({error:"something went wrong"});}

}

exports.comment = (req, res) => {
  const{comment,postId }= req.body.details;

 try{
     Post.findOneAndUpdate({_id:postId}, {$push: {comments: comment}}, {new: true})
                 .populate({path:'comments',populate:{path:'postedBy',model:'User',select:'_id firstName pofilePicture'}})
                 .populate('postedBy', '_id firstName pofilePicture')
			     .exec((error,result)=>{
			if(error){res.status(400).json({error:"could not find the post"});}
			if(result){
				let commentobj={};
				commentobj[result._id]={...result._doc};
				res.status(200).json({commentedPost:commentobj});
				}
		});
 }
          catch(error){res.status(400).json({error:"something went wrong"});}

}

exports.deletecomment = (req, res) => {
  const{comment,postId }= req.body.details;
 
 try{
     Post.findOneAndUpdate({_id:postId}, {$pull: {comments:{_id:comment._id}}}, {new: true})
                .populate({path:'comments',populate:{path:'postedBy',model:'User',select:'_id firstName pofilePicture'}})
				.populate('postedBy', '_id firstName pofilePicture')
			    .exec((error,result)=>{
			if(error){res.status(400).json({error:"could not find the post"});}
			if(result){
				let deletedcomobj={};
				deletedcomobj[result._id]={...result._doc};
				res.status(200).json({uncommentedPost:deletedcomobj});
				}
		});
 }
 
           catch(error){res.status(400).json({error:"something went wrong"});}

}




