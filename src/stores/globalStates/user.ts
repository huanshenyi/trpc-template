import create from 'zustand';

export type User = {
  id: string;
  name: string | null;
  image: string | null;
  githubUsername: string | null;
  twitterUsername: string | null;
  githubIsPublic: boolean;
  twitterIsPublic: boolean;
};

type UserStore = {
  user: User;
  regiestUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: '',
    name: '',
    image: '',
    githubUsername: '',
    twitterUsername: '',
    githubIsPublic: false,
    twitterIsPublic: false,
  },
  regiestUser: (user) =>
    set(() => ({
      user: { ...user },
    })),
}));
