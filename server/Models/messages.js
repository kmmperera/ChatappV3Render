const mongoose = require('mongoose');
const messageschema =new mongoose.Schema({
	message:{type: String,required:true,},
    sender: { type: String,required:true, },
    reciever: { type: String,required:true, }
     
	
	
},{ timestamps: true });

module.exports = mongoose.model('Messages', messageschema);
