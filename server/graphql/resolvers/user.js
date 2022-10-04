const User = require('../../models/User');
const {ApolloError}=require('apollo-server-errors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {lastname,name,username, email,password,isMilitar,isTemporal}}) {
            // Chequear si existe el usuario con email
            const oldUser= await User.findOne({email: email});

            // Throw Error if that user exists
            if(oldUser){
                throw new ApolloError('Ya existe el usuario que ingresaste' + email, 'USER_ALREADY_EXIST')
            }

            //Encrypt password
            var encryptedPassword = await bcrypt.hash(password,10)
            //Contruir Modelo
            const userID= Math.floor(Math.random() * 100000000);
            const newUser= new User({
                userID: userID,
                lastname:lastname,
                name:name,
                isMilitar: isMilitar,
                TimeCreate: new Date,
                isTemporal: isTemporal,
                username:username,
                email:email.toLowerCase(),
                password:encryptedPassword,
                emailVerified:false
            })
            // Create our JWT (attatch to our User Model)
            const token= jwt.sign(
                {user_id:newUser.id,email},
                "CUALQUIERCOSA",
                {
                    expiresIn:"24h"
                }
            );
            newUser.token=token;
            //Save our user in MongoDB
            const res = await newUser.save();
            console.log(res)

            return{
                id:res.id,
                ...res._doc
            }
        }
    },
    Query: {
        user: (_, {ID}) => User.findById(ID)
    }
}