import { authenticateUser } from './auth';
import models, { IModels } from './models/index';
import { Request } from 'express';

export interface MyContext {
  models: IModels;
  userId?: string;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const createContext = async ({ req }: { req: Request }): Promise<MyContext> => {
  return {
    models,
    userId: authenticateUser(req) ?? undefined,
  };
};
