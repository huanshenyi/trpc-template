import { ReactNode, useEffect } from 'react';
import { themeChange } from 'theme-change';

import Header from './Header';
import Footer from './Footer';

type LayoutProps = { children: ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <Header />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};
