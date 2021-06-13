import React, { useState, useEffect } from "react";
import { functions, searchMembers } from "../../util/firebase";
import { PaddingContainer } from "../../util/paddingcontainer";
import MembersTable from "./MembersTable";

export interface MemberI {
  full_name: string;
  year: string | number;
  city: string;
  profileImageURL?: string;
  current_occupation?: string | null;
  place_of_occupation?: string | null;
  bio?: string | null;
  objectID: string;
}

const Members = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [memberHits, setMemberHits] = useState([]);

  return (
    <PaddingContainer>
      <div className="md:px-24 select-none">
        <div className="px-8 pb-8">
          <label
            htmlFor="text"
            className="text-left  block text font leading-5 text-gray-700"
          >
            Search
          </label>
          <div className="mt-1 relative shadow-sm rounded-xl">
            {/* TODO: Fix focus color */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchText === "") {
                  setMemberHits([]);
                } else {
                  searchMembers(searchText).then((result) =>
                    setMemberHits(result.data)
                  );
                }
                return false;
              }}
            >
              <input
                id="search"
                className="border focus:outline-none border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-lg p-4 sm:leading-5 rounded-xl"
                placeholder=""
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <input type="submit" className="hidden" />
            </form>
          </div>
        </div>
        <MembersTable members={memberHits} />
      </div>
    </PaddingContainer>
  );
};

export default Members;
