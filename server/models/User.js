const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    userID:{type:Number},
    lastname:{type:String,default:null},
    name:{type:String,default:null},
    isMilitar:{type:Boolean},
    TimeCreate:{type:Date},
    isTemporal:{type:Boolean},
    username:{ type: String, default: null, unique:true},
    email: {type: String, unique:true},
    password: {type: String},
    emailVerified: {type:Boolean, default:false},
    token: {type:String}
});

module.exports = model('User', UserSchema);