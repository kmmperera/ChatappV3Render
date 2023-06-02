const mongoose = require('mongoose');

const workdetailschema = new mongoose.Schema({
	
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workdetails: [
        {
            
			place:{ type: String, required: true },
			date:{ type: String, required: true },
			from:{ type: Number, required: true },
			to:{ type: Number, required: true },
			hours:{ type: Number, required: true },
            
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('Work', workdetailschema);