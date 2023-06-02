const Complains = require("../Models/complains");

exports.addcomplain=(req,res)=>{
	Complains.findOne({idnumber:req.body.idnumber}).exec( (err,complain)=>{ if(err){
		   return res.status(400).json({
          message: "Something went wrong",
		  err,
        });
	}  if(complain){
		   return res.status(400).json({
          message: "This complain is already exisit,you can edit it if you want",
		 
        });
		
	}
		const{idnumber,complainer,inquerries}=req.body;
		const _complain=new Complains({idnumber,complainer,inquerries});
		
		_complain.save((err,complain)=>{if(err){
			
			return res.status(400).json({
          message: "Something went wrong",
		  err,
        });
			
		}
		if(complain){return res.status(200).json({complain});}
		
		});
	
	});
	
}

exports.editcomplain=(req,res)=>{
	
	
	Complains.findOne({idnumber:req.body.idnumber}).exec( (err,complain)=>{ if(err){
		   return res.status(400).json({
          message: "Something went wrong",
		  error,
        });
		
	} if (complain){
		
		
	}
	
	});
}

exports.deletecomplain=(req,res)=>{
	
	Complains.findOne({idnumber:req.body.idnumber}).exec( (err,complain)=>{ if(err){
		   return res.status(400).json({
          message: "Something went wrong",
		  error,
        });
		
	} if (complain){
		
	}});
	
}


