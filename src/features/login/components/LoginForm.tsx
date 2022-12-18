import { Button } from '~/components/Elements';
import { AuthLoginBtn } from '~/features/login/components';

export const LoginForm = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            className="block px-4 py-2 mt-2 rounded-md input input-bordered w-full"
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <a
              href="#"
              className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            autoComplete="off"
            className="block px-4 py-2 mt-2 rounded-md input input-bordered w-full"
          />
        </div>

        <div className="mt-6 pb-2">
          <Button className="w-full px-4 py-2" size="md" variant="info">
            Sign in
          </Button>
        </div>
        <AuthLoginBtn />
      </form>

      <p className="mt-6 text-sm text-center">
        Don&#x27;t have an account yet?
        <a
          href="#"
          className="text-blue-500 focus:outline-none focus:underline hover:underline"
        >
          Sign up
        </a>
        .
      </p>
    </div>
  );
};
