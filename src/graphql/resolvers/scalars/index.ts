import { GraphQLScalarType, GraphQLError } from 'graphql'
const { Kind } = require('graphql/language')

import {
  validateDateTime,
  validateUnixTimestamp,
  validateJSDate,
  serializeDateTime,
  serializeDateTimeString,
  serializeUnixTimestamp,
  parseDateTime
} from './../../../../node_modules/graphql-iso-date/dist/utils'

const DateTime: any = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' +
    'compliant with the `date-time` format outlined in section 5.6 of ' +
    'the RFC 3339 profile of the ISO 8601 standard for representation ' +
    'of dates and times using the Gregorian calendar.',
  serialize (value) {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return serializeDateTime(value)
      }
      throw new TypeError('DateTime cannot represent an invalid Date instance')
    } else if (typeof value === 'string' || value instanceof String) {
      if (validateDateTime(value)) {
        return serializeDateTimeString(value)
      }
      throw new TypeError(
        `DateTime cannot represent an invalid date-time-string ${value}.`
      )
    } else if (typeof value === 'number' || value instanceof Number) {
      if (validateUnixTimestamp(value)) {
        return serializeUnixTimestamp(value)
      }
      throw new TypeError(
        'DateTime cannot represent an invalid Unix timestamp ' + value
      )
    } else {
      throw new TypeError(
        'DateTime cannot be serialized from a non string, ' +
        'non numeric or non Date type ' + JSON.stringify(value)
      )
    }
  },
  parseValue (value) {
    if (!(typeof value === 'string' || value instanceof String)) {
      throw new TypeError(
        `DateTime cannot represent non string type ${JSON.stringify(value)}`
      )
    }

    if (validateDateTime(value)) {
      return parseDateTime(value)
    }
    throw new TypeError(
      `DateTime cannot represent an invalid date-time-string ${value}.`
    )
  },
  parseLiteral (ast: any) {
    if (ast.kind === Kind.STRING) {
      if (validateDateTime(ast.value)) {
        return parseDateTime(ast.value)
      }
    }
    return null
  }
})

export default {
  DateTime,
}