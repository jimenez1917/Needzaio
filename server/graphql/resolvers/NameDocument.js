const NameDocument = require('../../models/NameDocument');

module.exports = {
    Mutation: {
        async registerNameDocument(_,{nameDocumentInput:{nameTypeDocument}}){
                        // Chequear si existe el usuario con email
                        // const oldUser= await NameDocument.findOne({documentID: documentID});

                        // // // Throw Error if that user exists
                        // if(oldUser){
                        //     throw new ApolloError('Ya existe el usuario que ingresaste' + nameTypeDocument, 'USER_ALREADY_EXIST')
                        // }
                        const documentID=Math.floor(Math.random() * 100000000);
                        const newDocumentName= new NameDocument({
                            documentID:documentID,
                            nameTypeDocument: nameTypeDocument
                        })
                        const res = await newDocumentName.save();
                        console.log(res)

                        return{
                            id:res.id,
                            ...res._doc
                        }
        }
    },
    Query: {
        nameDocument: (_, {documentID}) => NameDocument.findById(documentID)
    }
}