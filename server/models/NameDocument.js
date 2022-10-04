const { model, Schema } = require('mongoose');

const NameDocumentSchema = new Schema({
    documentID:{type:Number, required:true},
    nameTypeDocument: {type:String}
});

module.exports = model('NameDocuments', NameDocumentSchema);