import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { ReactElement, ReactNode } from 'react';
import { DefaultLayout } from '~/components/DefaultLayout';
import { trpc } from '~/utils/trpc';

import '../styles/globals.css';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>,
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
