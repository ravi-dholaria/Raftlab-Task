import { GraphQLError } from 'graphql';
import { Types } from 'mongoose';

type Transformer<T> = (
  doc: Omit<T, '_id' | '__v'> & { id: string },
) => Omit<T, '_id' | '__v'> & { id: string };

/**
 * Converts a MongoDB document to a plain object, mapping _id to id and excluding
 * the __v field. If a transformer function is provided, it will be applied to
 * the plain object before returning it.
 *
 * @param {T | null} doc The MongoDB document to convert
 * @param {Transformer<T> | undefined} transformer An optional function to apply
 *   to the plain object before returning it
 *
 * @throws {GraphQLError} If the document is null
 *
 * @returns {Omit<T, '_id' | '__v'> & { id: string }}
 */
export default function convertToPlainObject<T extends { _id: Types.ObjectId; __v: number }>(
  doc: T | null,
  transformer?: Transformer<T>,
): Omit<T, '_id' | '__v'> & { id: string } {
  if (!doc) throw new GraphQLError("Document doesn't exist");

  // Create a new object and map _id to id and exclude __v
  const { _id, __v, ...rest } = doc;
  const plainObject = { id: _id.toString(), ...rest };

  // Apply the transformer function if provided
  if (transformer) {
    return transformer(plainObject);
  }

  return plainObject;
}
