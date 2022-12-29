import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

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
};

interface Iprops {
  user: User;
}

const Profile: NextPageWithLayout<Iprops> = ({ user }) => {
  if (user) {
    return (
      <>
        <ProfilePage user={user} />
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
