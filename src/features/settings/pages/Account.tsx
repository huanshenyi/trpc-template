import React, { useEffect } from 'react';

import { trpc } from '~/utils/trpc';
import { useNotificationStore } from '~/stores';
import { RouterOutput } from '~/utils/trpc';
import { useUserStore } from '~/stores';
import { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/routers/_app';

type UserByIdOutput = RouterOutput['user']['byId'];

interface IProps {
  user: UserByIdOutput;
}

type ChangeValue = {
  target: 'github' | 'twitter' | 'facebook' | 'youtube';
  value: boolean;
};

export const AccountPage: React.FC<IProps> = ({ user }) => {
  const { regiestUser } = useUserStore();
  const utils = trpc.useContext();
  const fixUser = trpc.user.fixById.useMutation({
    async onSuccess() {
      await utils.user.byId.invalidate();
      useNotificationStore.getState().addNotification({
        type: 'success',
        title: 'alignment sucess',
        message: '',
      });
    },
  });
  useEffect(() => {
    regiestUser(user);
  }, [fixUser.isSuccess, regiestUser, user]);

  const handelChangeAlignment = async ({ target, value }: ChangeValue) => {
    type Input = inferProcedureInput<AppRouter['user']['fixById']>;
    const input: Input = {
      id: user.id as string,
      name: user.name as string,
      bio: user.bio as string,
      url: user.url,
      twitterUsername: user.twitterUsername,
      location: user.location,
      githubUsername: user.githubUsername,
      githubIsPublic: user.githubIsPublic,
      twitterIsPublic: user.twitterIsPublic,
    };

    switch (target) {
      case 'github':
        input.githubIsPublic = value;
        break;
      case 'twitter':
        input.twitterIsPublic = value;
        break;
      default:
        console.log(`Sorry, None Type ${target}.`);
    }
    try {
      await fixUser.mutateAsync(input);
    } catch (cause) {
      console.error({ cause }, 'Failed to add post');
    }
  };

  return (
    <>
      <div className="space-y-2 md:space-y-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h1 className="md:text-2xl font-extrabold">Account Alignment</h1>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col">
              <div className="form-control w-52">
                <label className="cursor-pointer label">
                  <span className="label-text font-extrabold">
                    Default
                    <span
                      className="tooltip tooltip-right pl-2"
                      data-tip="連携内容はサイドバーに表示されます"
                    >
                      <span className="badge h-5 w-2">?</span>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className="divider mt-0"></div>
            <div className="overflow-x-auto">
              <div className="flex border shadow rounded-lg p-2 mb-2">
                <div className="flex flex-col justify-center px-2 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className=" w-12 object-cover h-12 rounded-xl"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center w-full px-2 py-1">
                  <div className="flex">
                    <div className="flex items-center mr-auto">
                      <p className="font-bold">GitHub</p>
                    </div>
                    {user.githubIsPublic ? (
                      <button
                        className="btn btn-outline btn-error"
                        onClick={() => {
                          handelChangeAlignment({
                            target: 'github',
                            value: false,
                          });
                        }}
                      >
                        連携解除
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline btn-info"
                        onClick={() => {
                          handelChangeAlignment({
                            target: 'github',
                            value: true,
                          });
                        }}
                      >
                        連携する
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex border shadow rounded-lg p-2 mb-2">
                <div className="flex flex-col justify-center px-2 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" w-12 object-cover h-12 rounded-xl "
                    viewBox="0 0 24 24"
                    fill="rgb(56 189 248)"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center w-full px-2 py-1">
                  <div className="flex">
                    <div className="flex items-center mr-auto">
                      <p className="font-bold">Twitter</p>
                    </div>
                    {user.twitterIsPublic ? (
                      <button
                        className="btn btn-outline btn-error"
                        onClick={() => {
                          handelChangeAlignment({
                            target: 'twitter',
                            value: false,
                          });
                        }}
                      >
                        連携解除
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline btn-info"
                        onClick={() => {
                          handelChangeAlignment({
                            target: 'twitter',
                            value: true,
                          });
                        }}
                      >
                        連携する
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="form-control w-52">
                <label className="cursor-pointer label">
                  <span className="label-text font-extrabold">Others</span>
                </label>
              </div>
            </div>
            <div className="divider mt-0"></div>
            <div className="overflow-x-auto">
              <div className="flex border shadow rounded-lg p-2 mb-2">
                <div className="flex flex-col justify-center px-2 py-1">
                  <svg
                    className=" w-12 object-cover h-12 rounded-xl "
                    viewBox="0 0 20 20"
                    fill="rgb(56 189 248)"
                  >
                    <path d="M10,0.5c-5.247,0-9.5,4.253-9.5,9.5c0,5.247,4.253,9.5,9.5,9.5c5.247,0,9.5-4.253,9.5-9.5C19.5,4.753,15.247,0.5,10,0.5 M10,18.637c-4.77,0-8.636-3.867-8.636-8.637S5.23,1.364,10,1.364S18.637,5.23,18.637,10S14.77,18.637,10,18.637 M10.858,7.949c0-0.349,0.036-0.536,0.573-0.536h0.719v-1.3H11c-1.38,0-1.866,0.65-1.866,1.743v0.845h-0.86V10h0.86v3.887h1.723V10h1.149l0.152-1.299h-1.302L10.858,7.949z"></path>
                  </svg>
                </div>
                <div className="flex flex-col justify-center w-full px-2 py-1">
                  <div className="flex">
                    <div className="flex items-center mr-auto">
                      <p className="font-bold">FaceBook</p>
                    </div>
                    <button className="btn btn-outline btn-info">
                      連携する
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex border shadow rounded-lg p-2 mb-2">
                <div className="flex flex-col justify-center px-2 py-1">
                  <svg
                    className="w-12 object-cover h-12 rounded-xl"
                    viewBox="0 0 20 20"
                    fill="rgb(244 63 94)"
                  >
                    <path d="M9.62,8.236h0.179c0.396,0,0.716-0.318,0.716-0.711V6.368c0-0.393-0.32-0.711-0.716-0.711H9.62c-0.396,0-0.716,0.318-0.716,0.711v1.157C8.904,7.917,9.224,8.236,9.62,8.236 M9.44,6.324c0-0.147,0.121-0.267,0.269-0.267c0.148,0,0.269,0.12,0.269,0.267v1.245c0,0.147-0.12,0.267-0.269,0.267c-0.148,0-0.269-0.12-0.269-0.267V6.324z M11.41,8.236c0.357,0,0.671-0.312,0.671-0.312v0.267h0.537V5.657h-0.537v1.957c0,0-0.18,0.222-0.358,0.222c-0.18,0-0.18-0.134-0.18-0.134V5.657h-0.536V7.88C11.007,7.88,11.052,8.236,11.41,8.236 M7.517,8.191h0.626V6.812l0.716-1.957H8.277L7.83,6.146l-0.447-1.29H6.756l0.76,1.957V8.191z M11.052,11.139c-0.116,0-0.207,0.068-0.269,0.135v1.794c0.057,0.061,0.141,0.119,0.269,0.119c0.269,0,0.269-0.299,0.269-0.299v-1.451C11.32,11.437,11.275,11.139,11.052,11.139 M10,0.469c-5.264,0-9.531,4.267-9.531,9.531c0,5.264,4.267,9.531,9.531,9.531c5.264,0,9.531-4.268,9.531-9.531C19.531,4.736,15.264,0.469,10,0.469 M10,18.665c-4.786,0-8.665-3.879-8.665-8.665c0-4.785,3.879-8.665,8.665-8.665c4.786,0,8.665,3.88,8.665,8.665C18.665,14.786,14.786,18.665,10,18.665 M13.289,8.792c0,0-1.642-0.085-3.289-0.085c-1.642,0-3.289,0.085-3.289,0.085c-0.742,0-1.343,0.573-1.343,1.28c0,0-0.134,0.831-0.134,1.664c0,0.831,0.134,1.664,0.134,1.664c0,0.708,0.601,1.28,1.343,1.28c0,0,1.616,0.086,3.289,0.086c1.615,0,3.289-0.086,3.289-0.086c0.741,0,1.343-0.572,1.343-1.28c0,0,0.134-0.84,0.134-1.664c0-0.84-0.134-1.664-0.134-1.664C14.632,9.365,14.03,8.792,13.289,8.792 M8.054,10.242H7.382v3.372H6.756v-3.372H6.084V9.688h1.969V10.242z M9.754,13.614H9.217v-0.257c0,0-0.313,0.299-0.671,0.299c-0.357,0-0.402-0.342-0.402-0.342v-2.646H8.68v2.475c0,0,0,0.129,0.179,0.129c0.179,0,0.358-0.214,0.358-0.214v-2.39h0.537V13.614z M11.856,12.974c0,0,0,0.683-0.491,0.683c-0.302,0-0.485-0.16-0.583-0.283v0.241h-0.581V9.688h0.581v1.273c0.089-0.094,0.308-0.292,0.583-0.292c0.357,0,0.491,0.298,0.491,0.683V12.974z M13.96,11.395v0.854h-1.118v0.64c0,0,0,0.299,0.268,0.299c0.27,0,0.27-0.299,0.27-0.299v-0.299h0.581v0.47c0,0-0.09,0.598-0.805,0.598c-0.717,0-0.851-0.598-0.851-0.598v-1.664c0,0,0-0.726,0.851-0.726C14.005,10.669,13.96,11.395,13.96,11.395 M13.109,11.139c-0.268,0-0.268,0.298-0.268,0.298v0.384h0.537v-0.384C13.379,11.437,13.379,11.139,13.109,11.139"></path>
                  </svg>
                </div>
                <div className="flex flex-col justify-center w-full px-2 py-1">
                  <div className="flex">
                    <div className="flex items-center mr-auto">
                      <p className="font-bold">YouTuBe</p>
                    </div>
                    <button className="btn btn-outline btn-info">
                      連携する
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-2 py-1 text-sm flex">
                <svg
                  className="svg-icon w-6 object-cover h-12 rounded-xl"
                  fill="red"
                >
                  <path d="M18.344,16.174l-7.98-12.856c-0.172-0.288-0.586-0.288-0.758,0L1.627,16.217c0.339-0.543-0.603,0.668,0.384,0.682h15.991C18.893,16.891,18.167,15.961,18.344,16.174 M2.789,16.008l7.196-11.6l7.224,11.6H2.789z M10.455,7.552v3.561c0,0.244-0.199,0.445-0.443,0.445s-0.443-0.201-0.443-0.445V7.552c0-0.245,0.199-0.445,0.443-0.445S10.455,7.307,10.455,7.552M10.012,12.439c-0.733,0-1.33,0.6-1.33,1.336s0.597,1.336,1.33,1.336c0.734,0,1.33-0.6,1.33-1.336S10.746,12.439,10.012,12.439M10.012,14.221c-0.244,0-0.443-0.199-0.443-0.445c0-0.244,0.199-0.445,0.443-0.445s0.443,0.201,0.443,0.445C10.455,14.021,10.256,14.221,10.012,14.221"></path>
                </svg>
                アカウント連携する場合、募集に応募、または募集かける際いに他のユーザーが確認することができます
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
