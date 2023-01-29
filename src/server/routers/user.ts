import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  bio: true,
  url: true,
  twitterUsername: true,
  location: true,
  githubUsername: true,
  twitterIsPublic: true,
  githubIsPublic: true,
});

export const userRouter = router({
  fixById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(32),
        bio: z.string().max(200).nullable(),
        url: z.string().max(50).nullable(),
        twitterUsername: z.string().max(50).nullable(),
        location: z.string().max(50).nullable(),
        githubUsername: z.string().max(50).nullable(),
        twitterIsPublic: z.boolean(),
        githubIsPublic: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const updateUser = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          bio: input.bio,
          url: input.url,
          twitterUsername: input.twitterUsername,
          location: input.location,
          githubUsername: input.githubUsername,
          githubIsPublic: input.githubIsPublic as boolean,
          twitterIsPublic: input.twitterIsPublic as boolean,
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
  verificationEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
        emailVerified: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const updateVerificationEmail = await prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          emailVerified: input.emailVerified,
        },
      });
      return updateVerificationEmail;
    }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
        select: defaultUserSelect,
      });
      return user;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const user = await prisma.user.delete({
        where: {
          id: id,
        },
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
