import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

enum AUTH_STATE {
  LOGIN,
  RESET,
}

const AuthLogin = ({ setAuthState }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorText, setErrorText] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signIn({ email, password });
        if (error) {
          setErrorText(error.message);
        }
      }}
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="email"
            type="email"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
          />
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="password"
            type="password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoCapitalize="current-password"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        {/* <div className="flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            className="form-checkbox h-4 w-4 text-red-600 transition duration-150 ease-in-out"
            onChange={(e) => setRememberMe(e.target.checked)}
            checked={rememberMe}
          />
          <label
            htmlFor="remember_me"
            className="ml-2 block text-sm leading-5 text-gray-900"
          >
            Remember me
          </label>
        </div> */}
        <div className="text-sm leading-5">
          <button
            type="button"
            onClick={() => {
              setAuthState(AUTH_STATE.RESET);
            }}
            className="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Forgot your password?
          </button>
        </div>
      </div>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
          >
            Sign in
          </button>
        </span>
      </div>
      {/* <div className="mt-6">
        <button
          className="width-full text-center"
          onClick={async () => {
            const { data, error } = await supabase.auth.api.sendMagicLinkEmail(
              email
            );
            if (!error) {
              setMagicLinkErrorText("Sent");
            } else {
              setMagicLinkErrorText("Error");
            }
          }}
        >
          Send me a magic link
        </button> 
    </div> */}
      <p className="text-red-800">{errorText}</p>
    </form>
  );
};
const AuthReset = ({ setAuthState }) => {
  const [email, setEmail] = useState<string>("");
  const [responseText, setResponseText] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { data, error } = supabase.auth.api.resetPasswordForEmail(email);
        if (error) {
          setResponseText("Something went wrong");
        } else {
          setResponseText("Email successfully sent");
        }
      }}
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="email"
            type="email"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
          />
        </div>
      </div>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
          >
            Send reset email
          </button>
        </span>
        <p className="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150">
          {responseText}
        </p>
        <div className="mt-6 flex items-center justify-between text-center">
          <div className="text-sm leading-5">
            <button
              type="button"
              onClick={() => setAuthState(AUTH_STATE.LOGIN)}
              className="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Log in instead
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export const AuthCard = ({ children }) => {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {children}
    </div>
  );
};

export const FullPageAuthCard = ({ children }) => (
  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <AuthCard>{children}</AuthCard>
  </div>
);

export default function Auth() {
  const [authState, setAuthState] = useState<AUTH_STATE>(AUTH_STATE.LOGIN);

  return (
    <FullPageAuthCard>
      {authState === AUTH_STATE.LOGIN ? (
        <AuthLogin {...{ setAuthState }} />
      ) : (
        <AuthReset {...{ setAuthState }} />
      )}
    </FullPageAuthCard>
  );
}
