const Document =require('../../models/Document');
const {ApolloError}=require('apollo-server-errors')

module.exports = {
    Mutation: {
        async registerDocument(_,{documentInput:{userID,document,placeExpedition,dateExpedition,TypeDocumentID}}){
            // Chequear si existe el usuario con email
            const oldDocument= await Document.findOne({userID: userID});

            // // Throw Error if that user exists
            if(oldDocument){
                throw new ApolloError('Ya existe el docunmento que ingresaste' + userID, 'USER_ALREADY_EXIST')
            }

           //Contruir Modelo
            const newDocument= new Document({
                 userID: userID,
                 document: document,
                 TypeDocumentID : TypeDocumentID,
                 placeExpedition: placeExpedition,
                 dateExpedition: dateExpedition,
            });
            // Create our JWT (attatch to our User Model)
            //Save our user in MongoDB
            const doc = await newDocument.save();
            console.log(doc);

            return{
                id:doc.id,
                ...doc._doc
            }
        }
    },
    Query: {
        document: (_, {userID}) => Document.findById(userID)
    }
}