const userResolvers = require('./user');
const nameDocumentResolver = require('./NameDocument');
const DocumentResolver=require('./Document');
const CountryResolver=require('./Country');
const ContactInfoResolver =require('./ContactInfo')

module.exports = {
    Query: {
        ...userResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...nameDocumentResolver.Mutation,
        ...DocumentResolver.Mutation,
        ...CountryResolver.Mutation,
        ...ContactInfoResolver.Mutation
    },
};