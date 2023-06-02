const mongoose = require('mongoose');
const userschema =new mongoose.Schema({
	firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
	 passwords: {
      type: String,
      required: true,
    },
    
    role: {
      type: String,
      enum: ["cleaner", "driver", "electrician","admin"],
      default: "cleaner",
    },
    contactNumber: { type: String },
    pofilePicture: { type: String },
    expoPushToken:{type:String},
	following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
	followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
	inbox:[{messenger:{type: mongoose.Schema.ObjectId, ref: 'User'} ,lastmessage:{type: mongoose.Schema.ObjectId, ref: 'Messages'},}]

	
	
},{ timestamps: true });

module.exports = mongoose.model('User', userschema);
