import * as z from 'zod';
import React from 'react';
import NextError from 'next/error';
import { inferProcedureInput } from '@trpc/server';

import { trpc } from '~/utils/trpc';
import { Form, InputField } from '~/components/Form';
import { Button } from '~/components/Elements/Button';
import type { AppRouter } from '~/server/routers/_app';

const schema = z.object({
  name: z.string().min(1, 'Required'),
});

type createValues = {
  name: string;
};

type UserData = {
  id: string;
  name: string | null;
};

interface Iprops {
  user: UserData | undefined;
}

export const ProfilePage: React.FC<Iprops> = ({ user }) => {
  const utils = trpc.useContext();
  const fixUser = trpc.user.fixById.useMutation({
    async onSuccess() {
      await utils.user.byId.invalidate();
    },
  });

  const userQuery = trpc.user.byId.useQuery({ id: user?.id as string });

  if (userQuery.error) {
    return (
      <NextError
        title={userQuery.error.message}
        statusCode={userQuery.error.data?.httpStatus ?? 500}
      />
    );
  }
  if (userQuery.status !== 'success') {
    return <>Loading...</>;
  }

  const { data } = userQuery;
  return (
    <>
      <div className="space-y-2 md:space-y-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h1 className="md:text-3xl font-extrabold">Profile</h1>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col">
              <div className="form-control w-52">
                <label className="cursor-pointer label">
                  <span className="label-text font-extrabold">基本情報</span>
                </label>
              </div>
            </div>
            <div className="divider mt-0"></div>
            <div className="overflow-x-auto">
              <Form<createValues, typeof schema>
                onSubmit={async (values) => {
                  type Input = inferProcedureInput<
                    AppRouter['user']['fixById']
                  >;
                  const input: Input = {
                    id: user?.id as string,
                    name: values.name,
                  };
                  try {
                    await fixUser.mutateAsync(input);
                  } catch (cause) {
                    console.error({ cause }, 'Failed to add post');
                  }
                }}
                schema={schema}
                options={{
                  shouldUnregister: true,
                  defaultValues: {
                    name: data.name as string,
                  },
                }}
                className="m-auto text-center"
              >
                {({ register, formState }) => (
                  <>
                    <InputField
                      type="text"
                      label="name"
                      error={formState.errors['name']}
                      registration={register('name')}
                      className="lg:w-3/5 m-auto"
                    />
                    <div>
                      <Button
                        isLoading={false}
                        type="submit"
                        className="m-auto text-center lg:w-3/5 w-full flex justify-center border-indigo-600 bg-transparent dark:bg-sky-500 dark:text-white p-4 border rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline shadow-lg cursor-pointer transition ease-in duration-300"
                      >
                        Update profile
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
