const { ApolloServer }  = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const MONGODB = "mongodb+srv://jimenez1917:dajiru17@cluster0.vfuad.mongodb.net/Needzaio?retryWrites=true&w=majority";

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: 5001});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });