import { ReactElement, useEffect } from 'react';
import { themeChange } from 'theme-change';

import Navbar from '~/features/settings/components/Navbar';
import Sidebar from '~/features/settings/components/Sidebar';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex justify-center lg:justify-start">
        <div className="lg:w-[60vw] max-w-screen-lg lg:pt-4 lg:p-4">
          <Navbar />
          <main className="flex-1 p-3 md:py-[35]">{children}</main>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};
