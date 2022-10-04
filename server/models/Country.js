const { model, Schema } = require('mongoose');

const CountrySchema = new Schema({
    countryID:{type:Number},
    countryCode: {type:String},
    countryName:{type:String},
});

module.exports = model('Country', CountrySchema);