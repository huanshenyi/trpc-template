import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultSchedeleSelect = Prisma.validator<Prisma.ScheduleSelect>()({
  id: true,
  title: true,
  content: true,
  start: true,
  end: true,
  isPublic: true,
});

export const schedeleRouter = router({
  list: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { userId } = input;

      const items = await prisma.schedule.findMany({
        select: defaultSchedeleSelect,
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        items: items.reverse(),
      };
    }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string().nullable(),
        start: z.string(),
        end: z.string(),
        isPublic: z.boolean(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const schedule = await prisma.schedule.create({
        data: input,
        select: defaultSchedeleSelect,
      });
      return schedule;
    }),
});
