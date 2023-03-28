import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '~/server/prisma';
import { TRPCError } from '@trpc/server';

const defaultSchedeleSelect = Prisma.validator<Prisma.ScheduleSelect>()({
  id: true,
  title: true,
  content: true,
  start: true,
  end: true,
  isPublic: true,
  user: true,
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
          OR: [
            {
              userId: userId,
            },
            {
              isPublic: true,
            },
          ],
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
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const post = await prisma.schedule.findUnique({
        where: { id },
        select: defaultSchedeleSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return post;
    }),
  fixById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string().nullable(),
        start: z.string(),
        end: z.string(),
        isPublic: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const updateSchedule = await prisma.schedule.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
          start: input.start,
          end: input.end,
          isPublic: input.isPublic,
        },
      });
      return updateSchedule;
    }),
  deleteById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const schedule = await prisma.schedule.delete({
        where: { id },
      });
      if (!schedule) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No delete with id '${id}'`,
        });
      }
      return schedule;
    }),
});
