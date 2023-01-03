/**
 * Integration test example for the `user` router
 */
import { expect, describe, it, afterAll } from 'vitest';
import { createContextInner } from '../context';
import { AppRouter, appRouter } from './_app';
import { inferProcedureInput } from '@trpc/server';

describe('user', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);
  const input: inferProcedureInput<AppRouter['user']['add']> = {
    name: 'test name',
    email: 'test@gmail.com',
  };
  const user = await caller.user.add(input);

  it('byId user', async () => {
    const byId = await caller.user.byId({ id: user.id });
    expect(byId).toMatchObject(input);
  });

  it('fixById user', async () => {
    const fixById = await caller.user.fixById({ ...user, name: 'new name' });
    expect(fixById.name).toBe('new name');
  });

  afterAll(async () => {
    await caller.user.delete({ id: user.id });
  });
});
