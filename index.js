const { ApolloServer,gql } = require('apollo-server');
const mongoose = require('mongoose');

const Post = require('./models/Post')
const { MONGODB } = require('./config')

const typeDefs = gql`
    type Post{
        id: ID!
        body:String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`
const resolvers = {
    Query:{
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts;
            }catch(err){
                throw new Error(err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => server.listen({port: 5000}))
    .then(res => console.log(`Server running at ${res.url}`));
  

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => console.log("DB connected!")
);
