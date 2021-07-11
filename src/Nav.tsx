import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useUser } from "./util/hooks";

export interface NavPage {
  name: string;
  path: string;
}

const shouldHighlightPane = (path: string, currentpath: string) => {
  if (currentpath === "/" || currentpath === "") {
    return path === currentpath;
  } else {
    return path.indexOf(currentpath) === 0;
  }
};

const Nav = (props: { pages: NavPage[] }) => {
  const { pages } = props;
  const [widescreenProfileMenuShown, setWidescreenProfileMenuShown] =
    React.useState(false);
  const [menuShown, setMenuShown] = React.useState(false);
  const [pfpURL, setPfpURL] = useState<string>("");

  const { user, updateUser } = useUser();

  const profile_url = user?.data?.profile_url;

  const location = useLocation();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex-shrink-0 flex items-center">
              <h1 className=" font-normal text-2xl text-blue-900 ">Alumbase</h1>
            </div>
            <div className="hidden lg:ml-8 lg:flex">
              {pages.map(({ name, path }, i) => (
                <Link
                  key={path}
                  to={path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-900 focus:outline-none transition duration-150 ease-in-out ${
                    shouldHighlightPane(path, location.pathname)
                      ? "border-red-500 focus:border-red-700"
                      : "border-transparent focus:text-gray-700 focus:border-gray-300 "
                  }
                    ${i !== 0 ? "ml-8" : ""}
                  `}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
          {/* <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div> */}
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
              onClick={() => setMenuShown(!menuShown)}
            >
              {/* Icon when menu is closed. */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open. */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            {/* <button
              className="flex-shrink-0 p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
              aria-label="Notifications"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button> */}
            {/* Profile dropdown */}
            <div className="ml-4 relative flex-shrink-0">
              <div>
                <button
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                  onClick={() =>
                    setWidescreenProfileMenuShown(!widescreenProfileMenuShown)
                  }
                  onBlur={() => setWidescreenProfileMenuShown(false)}
                >
                  {profile_url && profile_url !== "" ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={profile_url}
                      alt=""
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  )}
                </button>
              </div>
              {/*
        Profile dropdown panel, show/hide based on dropdown state.

        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      */}
              <div
                className={`${
                  widescreenProfileMenuShown
                    ? "transition ease-out duration-100 transform opacity-100 scale-100"
                    : "transition ease-in duration-75 transform opacity-0 scale-95"
                } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20`}
              >
                <div
                  className="py-1 rounded-md bg-white shadow-xs text-center"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out "
                    role="menuitem"
                  >
                    Profile/Settings
                  </Link>
                  <button
                    // TODO: Figure out why signout doesn't refresh state
                    onClick={() => {
                      supabase.auth.signOut();
                      updateUser({});
                    }}
                    className="block px-4 py-2 w-full text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
Mobile menu, toggle classes based on menu state.

Menu open: "block", Menu closed: "hidden"
*/}
      <div className={`${menuShown ? "block" : "hidden"} lg:hidden`}>
        <div className="pt-2 pb-3">
          {pages.map(({ name, path }, i) => (
            <Link
              key={path}
              to="#"
              className={` py-2  border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${
                shouldHighlightPane(path, location.pathname)
                  ? "bg-red-50  focus:text-red-800 focus:bg-red-100 focus:border-red-700 border-red-500 text-red-700 "
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300  "
              }
                    ${i !== 0 ? "mt-1 block pl-3 pr-4" : "block pl-3 pr-4 "}
                  `}
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {/* <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              {auth.currentUser?.photoURL ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={auth.currentUser?.photoURL || ""}
                  alt=""
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              )}
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-6 text-gray-800">
                Tom Cook
              </div>
            </div>
          </div> */}
          <div className="mt-3">
            <Link
              to="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              Profile
            </Link>

            <Link
              to="#"
              className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
