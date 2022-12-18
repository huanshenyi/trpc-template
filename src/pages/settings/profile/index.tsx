import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import { NextPageWithLayout } from '~/pages/_app';
import { Layout } from '~/features/settings/components';
import { Button } from '~/components/Elements/Button';

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
  const { data: session } = useSession();
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
                    <Button size="sm" variant="info">
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
                <table className="table w-full">
                  <tbody>
                    <tr>
                      <th>名前</th>
                      <td>{session?.user.name}</td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProfilePage;
