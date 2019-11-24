require("dotenv").config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

mongoose.set("useFindAndModify", false);

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.SECRET;

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
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        return Book.find({});
      } else if (args.author) {
        return Book.find({});
      } else if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author");
      } else {
        const books = await Book.find().populate("author");
        return books;
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      console.log("context.currentUser", context.currentUser);
      return context.currentUser;
    }
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
    login: async (root, args) => {
      const { password } = args;
      const { username, _id: id } = await User.findOne({
        username: args.username
      });
      if (!id || password !== "password") {
        throw new UserInputError("wrong credentials");
      }
      return { value: jwt.sign({ username, id }, JWT_SECRET) };
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
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
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
      console.log("author111", author);
      if (author) {
        return author;
      } else {
        return null;
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
