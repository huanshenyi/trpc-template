/**
 * Integration test example for the `post` router
 */
import { test, expect } from 'vitest';
import { createContextInner } from '../context';
import { AppRouter, appRouter } from './_app';
import { inferProcedureInput } from '@trpc/server';

test('byId and add user', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter['user']['add']> = {
    name: 'test name',
    email: 'test@gmail.com',
  };

  const user = await caller.user.add(input);
  const byId = await caller.user.byId({ id: user.id });
  await caller.user.delete({ id: user.id });
  expect(byId).toMatchObject(input);
});

test('fixById user', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter['user']['add']> = {
    name: 'test name',
    email: 'test@gmail.com',
  };
  const user = await caller.user.add(input);
  const fixById = await caller.user.fixById({ ...user, name: 'new name' });
  await caller.user.delete({ id: user.id });
  expect(fixById.name).toBe('new name');
});
