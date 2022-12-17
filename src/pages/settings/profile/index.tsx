import { useSession, signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

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

const ProfilePage = () => {
  const { data: session } = useSession();
  const handelSignOut = async () => {
    await signOut({
      callbackUrl: '/login',
    });
  };
  return (
    <div>
      <div>profile</div>
      {session && (
        <>
          <div>Signed in as {session.user?.id} </div>
          <button onClick={() => handelSignOut()}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
