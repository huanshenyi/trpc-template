import * as z from 'zod';
import React, { useEffect } from 'react';
import { inferProcedureInput } from '@trpc/server';

import { trpc } from '~/utils/trpc';
import { Form, InputField } from '~/components/Form';
import { Button } from '~/components/Elements/Button';
import type { AppRouter } from '~/server/routers/_app';
import { useNotificationStore } from '~/stores';
import { RouterOutput } from '~/utils/trpc';
import { useUserStore } from '~/stores';

const schema = z.object({
  name: z.string().min(1, 'Required'),
});

type createValues = {
  name: string;
};

type UserByIdOutput = RouterOutput['user']['byId'];

interface IProps {
  user: UserByIdOutput;
}

export const ProfilePage: React.FC<IProps> = ({ user }) => {
  const { regiestUser } = useUserStore();
  const utils = trpc.useContext();
  const fixUser = trpc.user.fixById.useMutation({
    async onSuccess() {
      await utils.user.byId.invalidate();
      useNotificationStore.getState().addNotification({
        type: 'success',
        title: 'fix profile sucess',
        message: '',
      });
    },
  });
  useEffect(() => {
    regiestUser(user);
  }, [fixUser.isSuccess, regiestUser, user]);
  return (
    <>
      <div className="space-y-2 md:space-y-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h1 className="md:text-2xl font-extrabold">Profile</h1>
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
                    id: user.id as string,
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
                    name: user.name as string,
                  },
                }}
                className="m-auto text-center"
              >
                {({ register, formState }) => (
                  <>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <InputField
                        type="text"
                        label=""
                        error={formState.errors['name']}
                        registration={register('name')}
                        className="lg:w-4/5"
                      />
                    </div>
                    <div>
                      <Button
                        isLoading={false}
                        type="submit"
                        className="flex"
                        variant="accent"
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
