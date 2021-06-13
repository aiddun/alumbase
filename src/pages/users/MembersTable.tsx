import React, { useState } from "react";
import Obfuscate from "../../util/Obfuscate";
import { MemberI } from "./Members";

const Member = ({
  full_name,
  year,
  city,
  profileImageURL,
  current_occupation,
  place_of_occupation,
  bio,
}: MemberI) => {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="block w-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out cursor-pointer select-none"
      onClick={() => {
        setFocused(!focused);
      }}
    >
      {/* Always shown part */}
      <div className={`flex items-center px-4 py-4 sm:px-6`}>
        <div className="min-w-0 flex-1 flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <div className="text-left text-lg leading-5 font-medium truncate flex">
                <Obfuscate text={full_name} />
                {/* TODO: Change to actual spacing */}
                {/* TODO: Make different classes different colors? */}
                <span className="ml-1" style={{ color: "chocolate" }}>
                  {" "}
                  {/* '2X year */}
                  <Obfuscate
                    text={"'" + (`${year}`.match(/\d{2}$/) || ["'XX"])[0]}
                  />
                </span>
              </div>
              <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                <span className="trunchate">
                  <Obfuscate
                    text={`${current_occupation}, ${place_of_occupation}`}
                  />
                </span>
              </div>
            </div>
            {/* <div className="hidden md:block">
            <div>
              <div className="text-sm leading-5 text-gray-900">
                Applied on
                <time dateTime="2020-01-07">January 7, 2020</time>
              </div>
              <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                <svg
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Completed phone screening
              </div>
            </div>
          </div> */}
          </div>
        </div>
        <div>
          {/* Pointer */}
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {/* expandable */}
      <div
        className={`${
          focused ? "" : "hidden"
        }  px-4 pt-0 pb-4 sm:px-6 transition-transform  
        `}
      >
        <p className="text-left text-sm text-gray-600 font-mono w-full md:w-2/3">
          <Obfuscate text={bio || ""} />
        </p>
        <button
          type="button"
          className="block px-3 py-2 my-4 border border-transparent text-sm leading-4 
                    font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-50 focus:outline-none 
                    focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          Get email
        </button>
      </div>
    </div>
  );
};

const sampleMembers = [
  {
    full_name: "Aidan Dunlap",
    year: 2023,
    city: "New York",
    profileImageURL:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    current_occupation: "Software Engineering Intern",
    place_of_occupation: "Microsoft",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    full_name: "Bidan Dunlap",
    year: 2023,
    city: "New York",
    profileImageURL:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    current_occupation: "Software Engineering Intern",
    place_of_occupation: "Microsoft",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    full_name: "Aidan Dunlap",
    year: 2023,
    city: "New York",
    profileImageURL:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    current_occupation: "Software Engineering Intern",
    place_of_occupation: "Microsoft",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const MembersTable = ({ members }: { members: MemberI[] }) => (
  <>
    {members.length === 0 ? (
      <p className="text-gray-700 ">Enter a query to search all profiles</p>
    ) : (
      <div className="bg-white shadow overflow-hidden sm:rounded-xl">
        <ul>
          {members.map((p) => (
            // TODO: change to userid
            <li key={p.objectID}>
              <Member {...p} />
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);

export default MembersTable;
