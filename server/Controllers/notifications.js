const User = require("../Models/user");
const { Expo } = require('expo-server-sdk');
const Messages = require("../Models/messages");
let expo = new Expo();
 



let tickets = [];
const sendnotifications =async (token,message) => {
	if (!Expo.isExpoPushToken(token)) {
    	console.log("invalid token",token);
    	//res.status(400).json({error:"error occoured"});
  	}
 

	let messages=[];
	messages.push({
    	to: token,
    	title:"New Message",
    	sound: 'default',
    	body: message,
    	data: { withSome: 'data' },
  	});
  	let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
    	try {
      	let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
	//let ticketChunk = await expo.sendPushNotificationsAsync(messages);
      	console.log(ticketChunk);
      	tickets.push(...ticketChunk);
      
    	} catch (error) {
     	 console.error(error);
   	 }
 	}
};
 

let receiptIds = [];
for (let ticket of tickets) {
  
  if (ticket.id) {
    receiptIds.push(ticket.id);
  }
}
 
let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
const checknotificationerrors =async () => {
  
  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log(receipts);
 
      
      for (let receiptId in receipts) {
        let { status, message, details } = receipts[receiptId];
        if (status === 'ok') {
          continue;
        } else if (status === 'error') {
          console.error(
            `There was an error sending a notification: ${message}`
          );
          if (details && details.error) {
            
            console.error(`The error code is ${details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
/* const updateInbox =(condition,updateData)=>{
	
	  User.findOneAndUpdate(condition, updateData, { upsert: true })
			.exec((error,result)=>{if(error){return 1 ;}
					if(result){return 1 ;}
				});
}	 */
	

const lastMessage= async(reciver ,sender,messageid)=>{
	User.findOne({ _id: sender  }).exec((error, result) => {
    		if (error) {	console.log("result not found");
								return 1 ;}
    		if (result) {
			//console.log("result found");
		//	let condition={ _id:sender , "inbox.messenger": reciver}; 
			let newEntry={messenger:reciver,lastmessage:messageid};
			let messengerExsist =result.inbox.find((r)=>{
			return r.messenger == reciver });

			if (messengerExsist){
							//console.log("messengerExsist");
			let condition={ _id:sender , "inbox.messenger": reciver}; 

			let updateData= { $set: {"inbox.$": newEntry,},};
			
				User.findOneAndUpdate(condition, updateData, { upsert: true })
			.exec((error,result)=>{if(error){console.log("set not working"); return 1 ;}
					if(result){console.log("set  working");return 1 ;}
					});
			
				}
			else{
				//console.log("messenger not Exsist");
			let	updateData = {$push: { inbox: newEntry,}, };
			let condition={ _id:sender }; 

			User.findOneAndUpdate(condition, updateData, { upsert: true })
			.exec((error,result)=>{if(error){console.log("push not working");return 1 ;}
					if(result){console.log("push  working"); return 1 ;}
					});
			}
			
			/* User.findOneAndUpdate(condition, updateData, { upsert: true })
			.exec((error,result)=>{if(error){return 1 ;}
					if(result){return 1 ;}
					}); */
			
			
			/* try{
			let finalresults = await User.findOneAndUpdate(condition, updateData, { upsert: true });
			
			return finalresults;
			}
			catch(err){return 1;} */
			
			// let ffresult= await updateInbox(condition,updateData);
			//return ffresult;
		}

		});
	}







exports.sendnotificationsfunc=(req,res)=>{
	
const {message,reciever,sender}=req.body.notification;

User.findOne({ _id: reciever }).exec( (error, user) => {
	if(error){return res.status(400).json({error:"error occoured"});}
	if(user){
		if(user.expoPushToken){ 
		sendnotifications(user.expoPushToken,message);
		 const _message = new Messages({message,sender,reciever});

	  _message.save((error, savedmessage) => {
      if (error) {
        return res.status(400).json({error: "Something went wrong" });
      }

      if (savedmessage) {
        
        const { _id,message,reciever,sender  } = savedmessage;
        return res.status(200).json({notifications:"notification sent",savem:savedmessage});
      }
    });

              }
		if(!user.expoPushToken){res.status(400).json({error:"user has no token to send notification "});}
	}
	


});




		
}


exports.savemessagetodb= async (data)=>{
	let dbresult;
	const {message,reciever,sender}=data;

User.findOne({ _id: reciever }).exec( (error, user) => {
	if(error){
	   // return res.status(400).json({error:"error occoured"});
		//dbresult="error user not found";
		return 0;
	}
	if(user){
		
		 const _message = new Messages({message,sender,reciever});

	  _message.save((error, savedmessage) => {
      if (error) {
      //  return res.status(400).json({error: "Something went wrong" });
		//dbresult="error saving to db";
		return 0;
      }

      if (savedmessage) {
        
        const { _id,message,reciever,sender  } = savedmessage;
		lastMessage(reciever,sender,_id).then(()=>{return lastMessage(sender,reciever,_id);}).then(()=>{return 1;}).catch((error)=>{return 1;});
		
      //  return res.status(200).json({notifications:"message saved to db",savem:savedmessage});
		//dbresult="saved to db";
		//return 1;
      }
    });

            
		
	}
	


});
		
}


exports.sendtoofflines=async (data)=>{
	//let dbresult;
	const {message,reciever,sender}=data;

User.findOne({ _id: reciever }).exec( (error, user) => {
	if(error){
		//return res.status(400).json({error:"error occoured"});
		//dbresult="error user not found";
		return 0;
	}
	if(user){
		if(user.expoPushToken){ 
		//sendnotifications(user.expoPushToken,message);
		 const _message = new Messages({message,sender,reciever});

	  _message.save((error, savedmessage) => {
      if (error) {
       // return res.status(400).json({error: "Something went wrong" });
	//dbresult="error in saving to db";
		return 0;
      }

      if (savedmessage) {
        
        //const { _id,message,reciever,sender  } = savedmessage;
       // return res.status(200).json({notifications:"notification sent",savem:savedmessage});
		//dbresult="notification sent ";
		sendnotifications(user.expoPushToken,message);
		
		//new code for inbox update
		const { _id,message,reciever,sender  } = savedmessage;
			lastMessage(reciever,sender,_id).then(()=>{return lastMessage(sender,reciever,_id);}).then(()=>{return 1;}).catch((error)=>{return 1;});
		
		//return 1 ;
      }
    });

              }
		if(!user.expoPushToken){
			
			
		//res.status(400).json({error:"user has no token to send notification "});
		//dbresult="user has no token to send notification ";
		//return 0;
		
				//sendnotifications(user.expoPushToken,message);
		 const _message = new Messages({message,sender,reciever});

			_message.save((error, savedmessage) => {
				if (error) {
      
					return 0;
						}

				if (savedmessage) {
					//new code for inbox update
		const { _id,message,reciever,sender  } = savedmessage;
			lastMessage(reciever,sender,_id).then(()=>{return lastMessage(sender,reciever,_id);}).then(()=>{return 1;}).catch((error)=>{return 1;});
       
		
					//return 1 ;
				}
			});
		

		}
	}
	


});
		
}



exports.dirrectMessage=async (req,res)=>{
	//let dbresult;
	const {message,reciever,sender}=req.body.notification;

User.findOne({ _id: reciever }).exec( (error, user) => {
	if(error){
		return res.status(400).json({error:"no user found"});
		//dbresult="error user not found";
		//return 0;
	}
	if(user){
		if(user.expoPushToken){ 
		//sendnotifications(user.expoPushToken,message);
		 const _message = new Messages({message,sender,reciever});

	  _message.save((error, savedmessage) => {
      if (error) {
       return res.status(400).json({error: "couldnt save msg" });
	//dbresult="error in saving to db";
		//return 0;
      }

      if (savedmessage) {
        
        //const { _id,message,reciever,sender  } = savedmessage;
       // return res.status(200).json({notifications:"notification sent",savem:savedmessage});
		//dbresult="notification sent ";
		sendnotifications(user.expoPushToken,message);
		
		//new code for inbox update
		const { _id,message,reciever,sender  } = savedmessage;
			lastMessage(reciever,sender,_id).then(()=>{return lastMessage(sender,reciever,_id);}).then(()=>{
				 return res.status(200).json({message: "message sent" });
				}).catch((error)=>{
				 return res.status(400).json({error: "couldnt send notification" });
				});
		
		//return 1 ;
      }
    });

              }
		if(!user.expoPushToken){
			
			
		//res.status(400).json({error:"user has no token to send notification "});
		//dbresult="user has no token to send notification ";
		//return 0;
		
				//sendnotifications(user.expoPushToken,message);
		 const _message = new Messages({message,sender,reciever});

			_message.save((error, savedmessage) => {
				if (error) {
      
					       return res.status(400).json({error: "couldnt save msg" });

						}

				if (savedmessage) {
					//new code for inbox update
		const { _id,message,reciever,sender  } = savedmessage;
			lastMessage(reciever,sender,_id).then(()=>{return lastMessage(sender,reciever,_id);}).then(()=>{
				 return res.status(200).json({message: "message sent" });
				}).catch((error)=>{
			 return res.status(400).json({error: "couldnt send notification" });
				});
       
		
					//return 1 ;
				}
			});
		

		}
	}
	


});
		
}









