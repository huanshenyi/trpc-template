import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { trpc } from '~/utils/trpc';
import NextError from 'next/error';

import { NextPageWithLayout } from '~/pages/_app';
import Layout from '~/features/settings/components/Layout';
import { ProfilePage } from '~/features/settings/pages/Profile';

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

const Profile: NextPageWithLayout<Iprops> = ({ user }) => {
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
        <ProfilePage user={data} />
      </>
    );
  } else {
    return <>Loading...</>;
  }
};

export default Profile;

Profile.getLayout = function (page) {
  return <Layout user={page.props.children[1].props?.user}>{page}</Layout>;
};
