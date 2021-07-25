import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { PaddingContainer } from "../../util/paddingcontainer";
import MembersTable from "./MembersTable";

import { definitions } from "../../../types/supabase";
type DataUser = definitions["members"];

const Members = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [memberHits, setMemberHits] = useState<DataUser[]>([]);

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
              onSubmit={async (e) => {
                e.preventDefault();
                if (searchText === "") {
                  setMemberHits([]);
                } else {
                  const { data, error } = await supabase
                    .from("members")
                    .select()
                    .textSearch(
                      "full_name|city|current_occupation|bio|place_of_occupation|year",
                      // turn "foo bar" to "'foo' & 'bar'"
                      searchText
                        .split(" ")
                        .map((token) => `'${token}'`)
                        .join(" & ")
                    );
                  
                    setMemberHits(data ?? [])
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
