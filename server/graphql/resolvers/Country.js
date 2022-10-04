const Country = require('../../models/Country');
module.exports = {
    Mutation: {
        async registerCountryInfo(_,{countryInput:{countryCode,countryName}}){
           //Contruir Modelo
           const CountryID=Math.floor(Math.random() * 100000000);
            const newCountry= new Country({
                countryID:CountryID,
                countryCode: countryCode,
                countryName:countryName
            });
            // Create our JWT (attatch to our User Model)
            //Save our user in MongoDB
            const res = await newCountry.save();
            console.log(res);

            return{
                id:res.id,
                ...res._doc
            }
        }
    },
    Query: {
        country: (_, {countryID}) => Country.findById(countryID)
    }
}