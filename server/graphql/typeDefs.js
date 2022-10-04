const { gql } = require('apollo-server');
const {GraphQLScalarType} = require('graphql')

module.exports = gql`
scalar Date

type User{
    userID: Int
    lastname:String
    name: String
    isMilitar: Boolean
    TimeCreate: String
    isTemporal: Boolean
    username: String
    email: String
    password: String
    emailVerified: Boolean
    token: String
}
type NameDocument{
    documentID:Int
    nameTypeDocument: String
}
type Document {
    userID: Int
    document: String
    TypeDocumentID: Int
    placeExpedition: String
    dateExpedition: Date
}
type CountryInfo{
    countryID: Int
    countryCode: String
    countryName: String
}
type ContactInfo{
    userID:Int
    address:String
    countryID:Int
    city: String
    phone: String
    pelPhone:String
    emergencyName:String
    emergencyPhone:String
}

#/////////////////////
input RegisterInput {
    name: String
    lastname:String
    isMilitar: Boolean
    isTemporal: Boolean
    username:String
    email: String
    password: String
}
input DocumentNameInput{
    nameTypeDocument:String
}
input DocumentInput{
    userID: Int
    TypeDocumentID: Int
    document: String
    placeExpedition: String
    dateExpedition: Date
}
input CountryInput{
    countryCode: String
    countryName: String
}
input ContactInput{
    userID:Int
    address:String
    countryID:Int
    city: String
    phone: String
    celPhone:String
    emergencyName:String
    emergencyPhone:String
}
#/////////////
type Query {
    user(_id: ID!): User
}
type Mutation {
    registerUser(registerInput: RegisterInput): User
    registerNameDocument(nameDocumentInput:DocumentNameInput): NameDocument
    registerDocument(documentInput: DocumentInput): Document
    registerCountryInfo(countryInput:CountryInput): CountryInfo
    registerContactInfo(contactInput:ContactInput): ContactInfo
}
`