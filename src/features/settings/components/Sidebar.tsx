import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import { useUserStore } from '~/stores';

const Sidebar: React.FC = () => {
  const handelSignOut = async () => {
    await signOut({
      callbackUrl: '/login',
    });
  };
  const { user } = useUserStore();

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <div className="overflow-y-auto flex lg:justify-end w-fit lg:w-[40vw]">
        <div className="w-fit p-3 lg:m-6 bg-base-100">
          <div className="avatar w-60">
            <div className="w-16 lg:w-32 rounded-full mx-auto">
              <img src={user.image || ''} />
            </div>
          </div>

          <h1 className="text-2xl p-2 pl-4">{user.name}</h1>
          <div className="flex gap-1 justify-center pt-4">
            <a className="btn btn-sm btn-ghost btn-square">
              <svg
                className="inline-block w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {user.twitterIsPublic && user.twitterUsername ? (
              <a
                className="btn btn-sm btn-ghost btn-square"
                href={`https://twitter.com/${user.twitterUsername}`}
              >
                <svg
                  className="inline-block w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            ) : null}
            {user.githubIsPublic && user.githubUsername ? (
              <a
                className="btn btn-sm btn-ghost btn-square"
                href={`https://github.com/${user.githubUsername}`}
              >
                <svg
                  className="inline-block w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            ) : null}
          </div>
          <div className="divider"></div>

          <div className="pt-4">
            <ul className="menu bg-base-100 rounded-box">
              <li>
                <Link href="/settings/profile">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Profile
                </Link>
              </li>
              {user.isAdmin && (
                <li>
                  <Link href="/settings/schedule">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Schedule
                  </Link>
                </li>
              )}
              <li>
                <Link href="/settings/account">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    className="h-5 w-5"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    ></path>
                  </svg>
                  Account
                </Link>
              </li>
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  Search
                </a>
              </li>
              <li>
                <div onClick={() => handelSignOut()}>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Logout
                </div>
              </li>
              <div className="divider"></div>
              <li className="hidden lg:block">
                <div className="flex gap-1 justify-center">
                  <button
                    data-set-theme="winter"
                    className="btn btn-sm btn-ghost btn-square"
                    data-act-classname="btn-active"
                  >
                    <svg
                      className="inline-block w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <title>ionicons-v5-q</title>
                      <path d="M256,118a22,22,0,0,1-22-22V48a22,22,0,0,1,44,0V96A22,22,0,0,1,256,118Z"></path>
                      <path d="M256,486a22,22,0,0,1-22-22V416a22,22,0,0,1,44,0v48A22,22,0,0,1,256,486Z"></path>
                      <path d="M369.14,164.86a22,22,0,0,1-15.56-37.55l33.94-33.94a22,22,0,0,1,31.11,31.11l-33.94,33.94A21.93,21.93,0,0,1,369.14,164.86Z"></path>
                      <path d="M108.92,425.08a22,22,0,0,1-15.55-37.56l33.94-33.94a22,22,0,1,1,31.11,31.11l-33.94,33.94A21.94,21.94,0,0,1,108.92,425.08Z"></path>
                      <path d="M464,278H416a22,22,0,0,1,0-44h48a22,22,0,0,1,0,44Z"></path>
                      <path d="M96,278H48a22,22,0,0,1,0-44H96a22,22,0,0,1,0,44Z"></path>
                      <path d="M403.08,425.08a21.94,21.94,0,0,1-15.56-6.45l-33.94-33.94a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.55,37.56Z"></path>
                      <path d="M142.86,164.86a21.89,21.89,0,0,1-15.55-6.44L93.37,124.48a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.56,37.55Z"></path>
                      <path d="M256,358A102,102,0,1,1,358,256,102.12,102.12,0,0,1,256,358Z"></path>
                    </svg>
                  </button>
                  <button
                    data-set-theme="garden"
                    className="btn btn-sm btn-ghost btn-square"
                    data-act-classname="btn-active"
                  >
                    <svg
                      className="inline-block w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                  </button>
                  <button
                    data-set-theme="dark"
                    className="btn btn-sm btn-ghost btn-square"
                    data-act-classname="btn-active"
                  >
                    <svg
                      className="inline-block w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <title>ionicons-v5-j</title>
                      <path d="M152.62,126.77c0-33,4.85-66.35,17.23-94.77C87.54,67.83,32,151.89,32,247.38,32,375.85,136.15,480,264.62,480c95.49,0,179.55-55.54,215.38-137.85-28.42,12.38-61.8,17.23-94.77,17.23C256.76,359.38,152.62,255.24,152.62,126.77Z"></path>
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
