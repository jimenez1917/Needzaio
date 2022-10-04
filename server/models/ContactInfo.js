const { model, Schema } = require('mongoose');

const ContactSchema = new Schema({
    userID:{type:Number},
    address:{type:String},
    countryID:{type:Number},
    city: {type:String},
    phone: {type:String},
    pelPhone:{type:String},
    emergencyName:{type:String},
    emergencyPhone:{type:String},
});

module.exports = model('ContactInfo', ContactSchema);