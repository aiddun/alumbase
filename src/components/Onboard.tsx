import React, { useState } from "react";
import { BasicProfileForm, EduExpForm } from "../pages/profile/Profile";
import { supabase } from "../supabaseClient";
import { useUser } from "../util/hooks";
const PasswordOnboard = ({
  setPasswordSet,
}: {
  setPasswordSet: (set: boolean) => void;
}) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("Set");

  const { authUser } = useUser();

  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="px-4 pt-5 bg-white space-t-6 sm:p-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
              setErrMsg("Passwords must match");
            } else {
              const { error } = await supabase.auth.api.updateUser(
                supabase.auth.session()?.access_token || "",
                {
                  password,
                }
              );
              if (error) {
                setErrMsg(error?.message);
              } else {
                setPasswordSet(true);
                setButtonText("Saved");
              }
            }
          }}
          method="post"
        >
          <h1 className="text-lg font-medium">Set a password</h1>
          <div className="md:flex items-end">
            <input
              hidden
              type="text"
              value={authUser.email}
              autoComplete="email"
            />
            <div className="mt-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 rounded-md shadow-sm w-full md:w-72">
                <input
                  id="password"
                  type="password"
                  required
                  className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="mt-3 md:ml-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1 rounded-md shadow-sm w-full md:w-72">
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
            <div className="mt-3 w-full flex justify-center pb-4 md:pb-0">
              <span className="w-20 rounded-md shadow-sm">
                <button
                  type="submit"
                  className="flex w-20 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-red active:bg-blue-700 transition duration-150 ease-in-out"
                >
                  {buttonText}
                </button>
              </span>
            </div>
          </div>
          <p className="text-red-700 pt-4 text-center">{errMsg}</p>
        </form>
      </div>
    </div>
  );
};

export default function Onboard() {
  // Should be empty but \shrug
  const [errText, setErrText] = useState("");
  const [passwordSet, setPasswordSet] = useState<boolean>(false);
  const { dataUser, authUser, updateUser } = useUser();
  const userData = { ...dataUser };

  return (
    <div className="z-10 flex justify-center items-center">
      <div className="max-w-4xl">
        <h1 className="pt-4 text-2xl md:text-4xl font-medium text-center pb-6">
          Complete Registration
        </h1>
        <PasswordOnboard setPasswordSet={setPasswordSet} />
        <div className="pt-8"></div>
        <BasicProfileForm userData={userData} />
        <div className="pt-8"></div>
        <EduExpForm userData={userData} />
        <div className="flex justify-center md:justify-end pt-8 w-full">
          <span className="rounded-md shadow-sm">
            <button
              type="submit"
              className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
              onClick={() => {
                const required_fields = ["full_name", "year", "city"];
                if (
                  passwordSet &&
                  userData.full_name &&
                  userData.year &&
                  userData.city
                ) {
                  setErrText("");
                  updateUser({ onboarded: true }, true);
                } else {
                  setErrText("Please complete and save all missing fields");
                }
              }}
            >
              Finish
            </button>
          </span>
        </div>
        <p className="text-red-800">{errText}</p>
      </div>
    </div>
  );
}
