import React, { useState } from 'react';
import { supabase } from '~/server/supabaseClient';

interface Iprops {
  email: string | null;
  verified: Date | null;
}

const EmailForm: React.FC<Iprops> = ({ email, verified }) => {
  const date = new Date();
  const [statusMsg, setStatusMsg] = useState<string>('認証する');
  const handleClickVerified = async () => {
    if (email) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/verification/${email}?code=${date.getTime()}`,
        },
      });
      if (!error) {
        setStatusMsg('確認用メール送信されました。');
      }
    }
  };
  return (
    <div className="form-control w-full max-w-xl">
      <label className="input-group">
        <input
          type="text"
          placeholder={email || ''}
          className="input input-bordered w-full"
        />
        {verified ? (
          <span className="w-28">認証済み</span>
        ) : (
          <label className="btn w-28" onClick={handleClickVerified}>
            {statusMsg}
          </label>
        )}
      </label>
      <label className="label">
        <span className="label-text-alt">
          「認証する」をクリックすれば、ご登録されたアドレスに確認用のメールが送信されます
        </span>
      </label>
    </div>
  );
};
export default EmailForm;
