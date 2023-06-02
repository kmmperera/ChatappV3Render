const mongoose = require('mongoose');

const complainsschema = new mongoose.Schema({
	idnumber:{type:Number,required:true},
    complainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inquerries: [
        {
            issue: { type: String, required: true },
            date: { type: Date },
            
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('Complains', complainsschema);