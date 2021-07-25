// No types anywhere for image-blob-reduce
// @ts-ignore
import ImageBlobReduce from "image-blob-reduce";
import React, { ReactChild, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { definitions } from "../../../types/supabase";
import { supabase } from "../../supabaseClient";
import {
  FormSelectInput,
  FormTextAreaInput,
  FormTextInput,
} from "../../util/forminput";
import { useUser } from "../../util/hooks";
import { TextInput } from "../../util/input";
import { PaddingContainer } from "../../util/paddingcontainer";

type User = definitions["members"];

// const f: User

const ProfileArea = ({
  sectionTitle,
  sectionDesc,
  children,
}: {
  sectionTitle: string;
  sectionDesc: string;
  children: ReactChild;
}) => (
  <>
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 text-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {sectionTitle}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{sectionDesc}</p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">{children}</div>
      </div>
    </div>
  </>
);

const emailRE =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// Image Processing
const reducer = new ImageBlobReduce({
  pica: ImageBlobReduce.pica({ features: ["js", "wasm", "ww"] }),
});

// Make sure to compress
reducer._create_blob = function (env: any) {
  return this.pica
    .toBlob(env.out_canvas, "image/jpeg", 0.8)
    .then((blob: Blob) => {
      env.out_blob = blob;
      return env;
    });
};

enum IMAGE_STATE {
  CURRENT,
  CHANGED,
  CLEARED,
}

export const BasicProfileForm = ({ userData }: any) => {
  const {
    register,
    formState: { errors, isDirty, isValid, isSubmitted, isSubmitSuccessful },
    control,
    handleSubmit,
  } = useForm({ defaultValues: userData });

  const { dataUser, updateUser } = useUser();
  const [pfpURL, setPfpURL] = useState<string>(`avatars/${dataUser.id}.jpg`);
  const [pfpBlob, setPfpBlob] = useState<Blob | null>(null);
  const [imageSelectorState, setImageSelectorState] = useState<IMAGE_STATE>(
    IMAGE_STATE.CURRENT
  );

  const onSubmit = async (data: Partial<User>) => {
    const user = supabase.auth.user();
    if (user && imageSelectorState === IMAGE_STATE.CHANGED) {
      const path = `avatars/${user.id}.jpg`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .update(path, pfpBlob as File, {
          upsert: true,
          cacheControl: `${60 * 60}`,
        });

      if (uploadError) alert(uploadError.message);

      data.avatar_url = path;
    } else if (imageSelectorState === IMAGE_STATE.CLEARED) {
      data.avatar_url = "";
    }

    updateUser(data);
    setImageSelectorState(IMAGE_STATE.CURRENT);
  };

  const onImageChange = async (files: File[]) => {
    const file = files[0];
    const blob: Blob = await reducer.toBlob(file, {
      max: 200,
      unsharpAmount: 80,
      unsharpRadius: 0.6,
      unsharpThreshold: 2,
    });

    setPfpBlob(blob);
    setImageSelectorState(IMAGE_STATE.CHANGED);
  };

  // TODO: Reenable later
  const imageUploadRef = useRef();
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop: onImageChange,
  //   accept: "image/*",
  // });

  // debugger;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <label className="block text-sm font-medium text-center">
              Photo
            </label>
            <div className="mt-1 flex flex-col items-center">
              <div className="relative">
                {/* Remove photo button */}
                {(pfpURL || pfpBlob) && (
                  <button
                    className="w-5 h-5 absolute right-0 rounded-full bg-white shadow grid focus:outline-none"
                    onClick={(e) => {
                      // empty blob?
                      e.preventDefault();
                      setImageSelectorState(IMAGE_STATE.CLEARED);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 m-auto gray"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="gray"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <span
                  className="inline-block h-20  w-20 rounded-full overflow-hidden bg-gray-100"
                  // TODO: Reenable
                  // {...getRootProps()}
                >
                  {/* {imageSelectorState !== IMAGE_STATE.CLEARED ||
                  pfpURL !== "" ? (
                    <img
                      src={
                        imageSelectorState === IMAGE_STATE.CHANGED && pfpBlob
                          ? URL.createObjectURL(pfpBlob)
                          : pfpURL
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : ( */}
                    <div className="w-full h-full bg-gray-300"></div>
                  {/* )} */}
                </span>
              </div>
              <button
                type="button"
                className="mt-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(e) => {
                  e.preventDefault();
                  // imageUploadRef.current?.click();
                }}
                // TODO: Reenable
                // {...getRootProps()}
                disabled={true}
              >
                Broken atm (don't try to use)
              </button>
              <input
                className="hidden"
                type="file"
                name="file"
                // onChange={onImageChange}
                // ref={imageUploadRef}
                accept="image/*"
                // TODO: REENABLE
                // {...getInputProps()}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <FormTextInput
                control={control}
                title="Preferred full name"
                name="full_name"
                htmlFor="full_name"
                autoComplete="name"
                error={errors.full_name}
                required={true}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <FormTextInput
                control={control}
                title="Graduation year"
                name="year"
                htmlFor="year"
                autoComplete="none"
                required={true}
                error={errors.year}
                rules={{ pattern: /^\d{4}$/ }}
              />
            </div>
            <div className="col-span-6 sm:col-span-4">
              <TextInput
                title="Email"
                value={supabase.auth.user()?.email || ""}
                disabled={true}
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <FormSelectInput
                control={control}
                options={[
                  "Prefer Not to Disclose",
                  "Austin",
                  "New York",
                  "Bay Area",
                  "Seattle",
                  "Chicago",
                  "Other",
                ]}
                title="Location"
                name="city"
                htmlFor="city"
                autoComplete="city"
                required={true}
                error={errors.city}
                optionKey="Other"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitSuccessful
              ? "Saved"
              : !isSubmitted || isValid
              ? "Save"
              : "Error"}
          </button>
        </div>
      </div>
    </form>
  );
};

export const EduExpForm = ({ userData }: any) => {
  const {
    register,
    formState: { errors, isSubmitSuccessful, isSubmitted, isValid },
    control,
    handleSubmit,
  } = useForm({ defaultValues: userData });

  const { updateUser } = useUser();

  const onSubmit = (data: User) => {
    updateUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 pt-5 bg-white space-t-6 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <FormTextInput
                control={control}
                title="Current occupation"
                name="current_occupation"
                htmlFor="text"
                autoComplete="none"
                error={errors.current_occupation}
                required={false}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <FormTextInput
                control={control}
                title="Employer/Institution/Other"
                name="place_of_occupation"
                htmlFor="text"
                autoComplete="none"
                error={errors.place_of_occupation}
                required={false}
              />
            </div>

            <div className="col-span-6 sm:col-span-5 text-left">
              <FormTextAreaInput
                control={control}
                title="Bio/Resume"
                name="bio"
                htmlFor="text"
                autoComplete=""
                error={errors.bio}
                required={false}
                description={`A text-based resume of things you've done and would like to share. This will be indexed for full-text search by other members. Feel free to copy paste directly from linkedin/a resume/whatever. `}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 
            border border-transparent shadow-sm text-sm font-medium rounded-md  
            text-white bg-indigo-600 hover:bg-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitSuccessful
              ? "Saved"
              : !isSubmitted || isValid
              ? "Save"
              : "Error"}
          </button>
        </div>
      </div>
    </form>
  );
};

const Profile = () => {
  // const [userData, loading, error] = useDocumentDataOnce<AllPageData>(() =>
  //   firestore.doc(`users/${user?.uid}`)
  // );

  const { dataUser: userData } = useUser();

  return (
    <PaddingContainer>
      <ProfileArea sectionTitle={"Basic Info"} sectionDesc={"Housekeeping"}>
        <BasicProfileForm userData={userData} />
      </ProfileArea>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <ProfileArea
        sectionTitle={"Education/Experience"}
        sectionDesc={
          "Things you'd like to share that could be useful for others to know. Everything is optional"
        }
      >
        <EduExpForm userData={userData} />
      </ProfileArea>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      {/* <ProfileArea
          sectionTitle={"Preferences"}
          sectionDesc={
            "Privacy!"
          }
          >
          <EduExpForm />
        </ProfileArea> */}
    </PaddingContainer>
  );
};

export default Profile;
