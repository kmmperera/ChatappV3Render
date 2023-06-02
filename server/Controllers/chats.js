const Messages = require("../Models/messages");

exports.getchats=(req,res)=>{

 const { id} = req.params;
 const logged=req.header("loggeduser");
Messages.find({$or:[{sender: id,reciever:logged},{reciever:id,sender: logged}]}).exec( (error, chat) => {
	if(error){
		res.status(400).json({error:"error occures"});
		}
	if(chat){
		res.status(200).json({chats:chat});
		}

	});
	
}
