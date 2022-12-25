import React from 'react';

type UserData = {
  id: string;
  name: string | null;
};

interface Iprops {
  user: UserData;
}

export const Profile: React.FC<Iprops> = () => {
  return <div>xx</div>;
};
