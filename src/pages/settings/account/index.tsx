import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import NextError from 'next/error';

import { trpc } from '~/utils/trpc';
import { NextPageWithLayout } from '~/pages/_app';
import Layout from '~/features/settings/components/Layout';
import { AccountPage } from '~/features/settings/pages/Account';

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
  return { props: { user: session.user } };
};

type User = {
  id: string;
  name: string | null;
  image: string | null;
};

interface Iprops {
  user: User;
}

const Account: NextPageWithLayout<Iprops> = ({ user }) => {
  if (user) {
    const userQuery = trpc.user.byId.useQuery({ id: user.id as string });
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
        <AccountPage user={data} />
      </>
    );
  } else {
    return <>Loading...</>;
  }
};

export default Account;

Account.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
