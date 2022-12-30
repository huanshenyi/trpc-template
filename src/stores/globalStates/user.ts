import create from 'zustand';

export type User = {
  id: string;
  name: string | null;
  image: string | null;
};

type UserStore = {
  user: User;
  regiestUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: { id: '', name: '', image: '' },
  regiestUser: (user) =>
    set(() => ({
      user: { ...user },
    })),
}));
