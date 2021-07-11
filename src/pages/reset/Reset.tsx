import React, { useState, useEffect } from "react";
import { FullPageAuthCard } from "../../components/Auth";
import { supabase } from "../../supabaseClient";
import { Redirect } from "react-router";

export default function Reset({
  recoveryToken,
  setRecoveryToken,
}: {
  recoveryToken: string;
  setRecoveryToken: any;
}) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const [reset, setReset] = useState<false>(false);

  return (
    // Disable external clicks - required modal
    <div className="w-screen h-screen absolute inset-0 bg-white bg-opacity-60 flex items-center">
      <FullPageAuthCard>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
              setErrMsg("Passwords must match");
            } else {
              const { error } = await supabase.auth.api.updateUser(
                recoveryToken,
                {
                  password,
                }
              );

              if (!error) {
                // To render our Todo list again
                setRecoveryToken(null);
                setReset(true);
              } else {
                setErrMsg("Something went wrong");
              }
            }
          }}
        >
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              New Password
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Confirm New Password
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="block w-20 rounded-md shadow-sm">
              <button
                type="submit"
                className=" flex w-20 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-red active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Reset
              </button>
            </span>
          </div>
        </form>
        {errMsg}
      </FullPageAuthCard>
      )
    </div>
  );
}
