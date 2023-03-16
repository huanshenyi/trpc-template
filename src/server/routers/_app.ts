/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { postRouter } from './post';
import { userRouter } from './user';
import { schedeleRouter } from './schedule';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  post: postRouter,
  user: userRouter,
  schedule: schedeleRouter,
});

export type AppRouter = typeof appRouter;
