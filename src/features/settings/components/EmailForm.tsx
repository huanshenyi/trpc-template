import React from 'react';

interface Iprops {
  email: string | null;
  verified: Date | null;
}

const EmailForm: React.FC<Iprops> = ({ email, verified }) => {
  const handleClickVerified = () => {
    console.log('');
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
          <span>任書済み</span>
        ) : (
          <label className="btn" onClick={handleClickVerified}>
            認証する
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
