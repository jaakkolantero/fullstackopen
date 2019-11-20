require("dotenv").config();
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const uuid = require("uuid/v1");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

mongoose.set("useFindAndModify", false);

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return Book.find({});
      } else if (args.author) {
        return Book.find({});
      } else if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } });
      } else {
        return Book.find({});
      }
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async root => {
      return await Book.find({ author: root.id }).countDocuments();
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args;
      if (await User.findOne({ username: args.username })) {
        throw new UserInputError("username must be unique", {
          invalidArgs: args.username
        });
      }
      try {
        const user = new User({ username, favoriteGenre });
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    addBook: async (root, args) => {
      const books = await Book.findOne({ title: args.title });
      if (books) {
        throw new UserInputError("title must be unique", {
          invalidArgs: args.title
        });
      }
      const author = await Author.findOne({ name: args.author });
      if (author) {
        try {
          const book = await new Book({ ...args, author }).save();
          return { ...book.toObject(), author: author.toObject() };
        } catch (error) {
          throw new UserInputError(error.message);
        }
      } else {
        try {
          const newAuthor = await new Author({
            name: args.author,
            born: null
          }).save();
          const book = await new Book({
            ...args,
            author: { ...newAuthor }
          }).save();
          return { ...book.toObject(), author: { ...newAuthor.toObject() } };
        } catch (error) {
          throw new UserInputError(error.message);
        }
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      const updatedAuthor = await author.save();
      if (updatedAuthor) {
        return updatedAuthor;
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
