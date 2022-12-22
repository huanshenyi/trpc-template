import { trpc } from '~/utils/trpc';
import * as z from 'zod';
import { useState } from 'react';
import { inferProcedureInput } from '@trpc/server';
import { Form, InputField } from '~/components/Form';
import NextError from 'next/error';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import { NextPageWithLayout } from '~/pages/_app';
import { Layout } from '~/features/settings/components';
import { Button } from '~/components/Elements/Button';
import type { AppRouter } from '~/server/routers/_app';

const schema = z.object({
  name: z.string().min(1, 'Required'),
});

type createValues = {
  name: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session?.user.id === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return { props: {} };
};

const ProfilePage: NextPageWithLayout = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const { data: session } = useSession();
  const utils = trpc.useContext();

  const fixUser = trpc.user.fixById.useMutation({
    async onSuccess() {
      setNewName('');
      await utils.user.byId.invalidate();
    },
  });

  const userQuery = trpc.user.byId.useQuery({ id: session?.user.id as string });

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
      <Layout>
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
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => {
                        setShowForm(!showForm);
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        ></path>
                      </svg>
                      編集
                    </Button>
                  </label>
                </div>
              </div>
              <div className="divider mt-0"></div>
              <div className="overflow-x-auto">
                {showForm ? (
                  <Form<createValues, typeof schema>
                    onSubmit={async (values) => {
                      type Input = inferProcedureInput<
                        AppRouter['user']['fixById']
                      >;
                      const input: Input = {
                        id: session?.user.id as string,
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
                          label="場所を追加"
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
                            募集追加
                          </Button>
                        </div>
                      </>
                    )}
                  </Form>
                ) : (
                  <table className="table w-full">
                    <tbody>
                      <tr>
                        <th>名前</th>
                        <td>{data.name}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProfilePage;
