const Work = require("../Models/workdetails");

exports.getworkdetails=(req,res)=>{
	
const {_id}=req.body;
	Work.findOne({employee:_id}).exec((error,workdetails)=>{
		
		if(error){res.status(400).json({error:"could not find details"});}
		if(workdetails){res.status(200).json({workdetails:workdetails});}
		if(!workdetails){res.status(400).json({error:"work details for this user does not exsist "});}
	});
	
	
	
	
}

exports.putworkdetails=(req,res)=>{
	const {date,place,from,to,hours,id}=req.body;
	if(id){
		Work.findOne({employee:id}).exec((error,doc)=>{
			if(error){res.status(400).json({error:"cant find you "});}
			if(!doc){
				const details=new Work({employee:id,workdetails:{date,place,from,to,hours}});
				 details.save((error, saveddetails) => {
					 
					 if(error){res.status(400).json({error:"could not save "});}
					 if(saveddetails){res.status(200).json({workdetails:saveddetails});}
				 });
				
				
				}
			if(doc){
				Work.findOneAndUpdate({employee:id},{$push:{workdetails:{date,place,from,to,hours}}},{new: true}).exec((error,updateddoc)=>{
					
					if(error){res.status(400).json({error:"could not update "});}
					if(updateddoc){
						res.status(200).json({workdetails:updateddoc});
						
					}
				});
				
				
				}	
		});
	
	}
	else{
		res.status(400).json({error:"please log in"});
	}
}