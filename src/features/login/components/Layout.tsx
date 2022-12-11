import * as React from 'react';
import { themeChange } from 'theme-change';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  info: string;
};

export const Layout = ({
  children,
  title = 'title',
  info = 'info',
}: LayoutProps) => {
  React.useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">{title}</h2>

              <p className="max-w-xl mt-3 text-gray-300">{info}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                {title}
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">{info}</p>
            </div>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
