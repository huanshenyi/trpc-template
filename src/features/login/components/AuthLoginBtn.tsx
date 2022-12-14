import { signIn } from 'next-auth/react';

import { Button } from '~/components/Elements';

export const AuthLoginBtn = () => {
  return (
    <>
      <Button
        className="px-4 py-2 gap-2 mb-2 w-full"
        variant="primary"
        onClick={() => signIn('github')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        Sign in with Github
      </Button>
      <Button
        className="px-4 py-2 gap-2 mb-2 w-full"
        variant="warning"
        onClick={() => signIn('google')}
      >
        <svg className="svg-icon h-6 w-6" viewBox="0 0 20 20">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10,0.562c-5.212,0-9.438,4.226-9.438,9.438c0,5.213,4.226,9.438,9.438,9.438c5.212,0,9.438-4.225,9.438-9.438C19.438,4.788,15.212,0.562,10,0.562 M10,18.58c-4.738,0-8.58-3.841-8.58-8.58c0-4.738,3.842-8.58,8.58-8.58c4.737,0,8.579,3.841,8.579,8.58C18.579,14.739,14.737,18.58,10,18.58 M10.033,10.346C9.813,10.183,9.608,9.94,9.6,9.865c0-0.128,0-0.188,0.303-0.435c0.393-0.322,0.609-0.745,0.609-1.192c0-0.387-0.108-0.731-0.293-0.982h0.164l0.908-0.688H8.832c-0.986,0-1.851,0.774-1.851,1.657c0,0.912,0.667,1.604,1.565,1.642C8.533,9.933,8.525,9.996,8.525,10.06c0,0.131,0.03,0.257,0.09,0.378c-1.113,0.007-2.05,0.752-2.05,1.632c0,0.789,0.902,1.362,2.145,1.362c1.343,0,2.067-0.84,2.067-1.631C10.778,11.143,10.576,10.748,10.033,10.346 M8.026,8.198C7.985,7.869,8.054,7.565,8.212,7.384c0.096-0.11,0.22-0.169,0.358-0.169V7.036l0.016,0.179c0.412,0.014,0.807,0.501,0.88,1.086c0.042,0.335-0.03,0.647-0.191,0.833c-0.096,0.11-0.217,0.169-0.367,0.168h0C8.503,9.29,8.1,8.784,8.026,8.198 M8.707,12.749c-0.612,0-1.093-0.394-1.093-0.897c0-0.461,0.562-0.865,1.202-0.865v-0.18h0l0.017,0.18c0.138,0.002,0.272,0.022,0.399,0.062l0.126,0.092c0.326,0.231,0.498,0.363,0.549,0.575c0.013,0.056,0.019,0.111,0.019,0.167C9.927,12.458,9.517,12.749,8.707,12.749M13.43,6.993h-0.858v1.288H11.28V9.14h1.291v1.283h0.858V9.14h1.293V8.281H13.43V6.993z"
          ></path>
        </svg>
        Sign in with Google
      </Button>
    </>
  );
};
