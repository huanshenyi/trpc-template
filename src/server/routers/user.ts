import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
});

export const userRouter = router({
  fixById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(32),
      }),
    )
    .mutation(async ({ input }) => {
      const updateUser = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
      return updateUser;
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const user = await prisma.user.findUnique({
        where: { id },
        select: defaultUserSelect,
      });
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }
      return user;
    }),
});
