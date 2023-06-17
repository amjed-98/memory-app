import type { FilterQuery, Model } from 'mongoose';
import HttpError from './HttpError';

export default async function findOneOrThrow<T>(
  model: Model<T>,
  conditions: FilterQuery<T>,
  errorObj: ConstructorParameters<typeof HttpError>[0] = { message: 'Bad Request', status: 400 }
) {
  const result = await model.findOne(conditions);

  if (!result) throw new HttpError(errorObj);

  return result;
}
