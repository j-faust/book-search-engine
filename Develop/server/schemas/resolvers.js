const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user_id });
      }
      throw new AuthenticationError('No User Found!');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No User Found!');
      }
      const pw = await user.isCorrectPassword(password);
      if (!pw) {
        throw new AuthenticationError('Incorrect Password Entered!');
      }
      const token = signToken(user);
      return { token, user };
    },
    savedBook: async (parent, { Book }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      return User.findOneAndUpdate(
        { _id: context.user_id },
        {
          $addToSet: { savedBooks: Book },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      return User.findOneAndUpdate(
        { _id: context.user_id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;