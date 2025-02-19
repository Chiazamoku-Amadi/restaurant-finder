"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const HeaderNavBar = () => {
  const [profileClicked, setProfileClicked] = useState(false);
  const { data: session } = useSession();

  return (
    session?.user && (
      <div className="flex justify-between items-center bg-white px-12 h-[10vh]">
        <div className="flex items-center gap-4 md:gap-7">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <h2 className="font-medium">Home</h2>
          <h2 className="font-medium">Favourite</h2>
        </div>

        <div className="hidden md:flex gap-3 bg-gray-100 p-[6px] rounded-md w-[40%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15.553 15.553a7.06 7.06 0 1 0-9.985-9.985a7.06 7.06 0 0 0 9.985 9.985m0 0L20 20"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full"
          />
        </div>

        <div>
          {session?.user ? (
            <>
              <Image
                src={session?.user.image}
                alt="user"
                width={40}
                height={40}
                onClick={() => setProfileClicked((prev) => !prev)}
                className="cursor-pointer rounded-full"
              />

              <div
                className={`${
                  profileClicked ? "block" : "hidden"
                } absolute z-50 text-sm bg-white rounded-md
            shadow-md border px-2 py-1 mt-2`}
              >
                <h2
                  className="cursor-pointer
               hover:text-blue-500 hover:font-bold"
                  onClick={() => signOut()}
                >
                  Sign Out
                </h2>
              </div>
            </>
          ) : null}
        </div>
      </div>
    )
  );
};

export default HeaderNavBar;
