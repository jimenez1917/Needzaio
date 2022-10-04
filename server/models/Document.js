const { model, Schema } = require('mongoose');

const DocumentSchema = new Schema({
    userID:{type:Number},
    document: {type:String},
    TypeDocumentID:{type:Number},
    placeExpedition:{type:String},
    dateExpedition: {type:Date},
});

module.exports = model('Document', DocumentSchema);