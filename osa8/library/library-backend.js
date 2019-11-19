require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require('mongoose')
const uuid = require("uuid/v1");
const Author = require("./models/author");
const Book = require("./models/book");


mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) =>
      {
        const books = Book.find({})
        return args.author
        ? args.genre
          ? books
              .filter(b => b.genres.filter(g => g.includes(args.genre)).length)
              .filter(b => b.author === args.author)
          : books.filter(b => b.author === args.author)
        : args.genre
        ? books.filter(b => b.genres.filter(g => g.includes(args.genre)).length)
        : books},
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: root => Book.find({author:root.name}).length
  },
  Mutation: {
    addBook: async (root, args) => {
      const books = await Book.findOne({title:args.title});
      console.log('books', books)
      if (books) {
        throw new UserInputError("title must be unique", {
          invalidArgs: args.title
        });
      }
      const author = await Author.findOne({name:args.author});
      if (author) {
        const book = await (new Book({ ...args, author })).save();
        return {...book.toObject(),author:author.toObject()};
      } else {
        try {
          const newAuthor = await (new Author({ name: args.author, born: null })).save();
          const book = await (new Book({ ...args, author:{...newAuthor}})).save();
          return {...book.toObject(),author:{...newAuthor.toObject()}};
        } catch (error) {
          console.log('error', error)
        }
      }
    },
    editAuthor: (root, args) => {
      const oldAuthor = authors.find(a => a.name === args.name);
      if (oldAuthor) {
        const newAuthor = { ...oldAuthor, born: args.setBornTo };
        authors = authors.map(a => (a.name === args.name ? newAuthor : a));
        return newAuthor;
      } else {
        return null;
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
