const ContactInfo = require('../../models/ContactInfo');

module.exports = {
    Mutation: {
        async registerContactInfo(_,{contactInput:{userID,address,countryID,city,phone,celPhone,emergencyName,emergencyPhone}}){
            const newContactInfo= new ContactInfo({
                userID:userID,
                address:address,
                countryID:countryID,
                city:city,
                phone:phone,
                celPhone:celPhone,
                emergencyName:emergencyName,
                emergencyPhone:emergencyPhone
            });
            // Create our JWT (attatch to our User Model)
            //Save our user in MongoDB
            const res = await newContactInfo.save();
            console.log(res);

            return{
                id:res.id,
                ...res._doc
            }
        }
    },
    Query: {
        contact: (_, {userID}) => ContactInfo.findById(userID)
    }
}