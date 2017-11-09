import { GraphQLScalarType, GraphQLError } from 'graphql'
const { Kind } = require('graphql/language')

const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date type',
  parseValue (value) {
    // value comes from the client, in variables
    validateValue(value);
    return new Date(value); // sent to resolvers
  },
  parseLiteral (ast) {
    // value comes from the client, inlined in the query
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Can only parse dates strings, got a: ${ast.kind}`, [ast]);
    }
    validateValue(ast);
    return new Date(ast); // sent to resolvers
  },
  serialize (value) {
    // value comes from resolvers
    return value.toISOString(); // sent to the client
  },
})

const validateValue = value => {
  if (isNaN(Date.parse(value))) {
    throw new GraphQLError(`Query error: not a valid date`, [value]);
  }
}

export default {
  Date
}