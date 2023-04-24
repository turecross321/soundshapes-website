import { useRouter } from "next/router";
import { CheckIfFollowed, GetUser } from "@/api/api-users";
import { LogOut } from "@/api/api-authentication";
import { FC, useContext, useEffect, useState } from "react";
import { UserResponse } from "@/api/types/user-response";
import Head from "next/head";
import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import FollowButton from "@/components/follow-button";
import { SessionContext } from "@/contexts/SessionContext";
import Sidebar from "@/components/sidebar";
import Levels from "@/components/levels";
import Users from "@/components/users";
import { GetLevelsByUser } from "@/api/api-levels";
import { LevelResponseWrapper } from "@/api/types/level-responses";

interface IndexPageProps {
  userProp: UserResponse;
  levelsProp: LevelResponseWrapper;
}

export default function Page({ userProp, levelsProp }: IndexPageProps) {
  const [user, setUser] = useState<UserResponse>(userProp);
  const { setSession } = useContext(SessionContext);
  const [page, setPage] = useState<number>(0);

  if (!user || !userProp || !levelsProp || userProp.Id == "")
    return (
      <div className="w-80 max-w-screen content content-padding">
        Could not find user.
      </div>
    );

  if (user.Id != userProp.Id) setUser(userProp);

  async function RefreshPage() {
    let refreshedUser = await GetUser(user.Id);
    if (refreshedUser) setUser(refreshedUser);
  }

  async function HandleLogOut() {
    if (setSession)
      setSession({ Id: "", ExpiresAt: new Date(), UserId: "", Username: "" });
    await LogOut();
    localStorage.removeItem("session");
    localStorage.removeItem("email");
    localStorage.removeItem("hash");
  }

  async function GetLevelsPublishedByUser(from: number, count: number) {
    let response = await GetLevelsByUser(user.Id, from, count);

    return response;
  }

  function GetCurrentPage() {
    if (page == 0)
      return (
        <Levels
          levelWrapper={levelsProp}
          fromProp={0}
          pageSize={6}
          dataFetcher={GetLevelsPublishedByUser}
        />
      );
    if (page == 1) return <Users />;
    if (page == 2) return <Users />;
    if (page == 3) return <>lol</>;
  }

  return (
    <main className="flex justify-between max-w-sm md:max-w-none">
      <div>
        <div className="content content-padding w-full max-w-sm">
          <div className="flex justify-between items-start">
            <div className="overflow-x-clip">
              <h1 className="text-3xl font-bold break-words w-auto">
                {user.Username}
              </h1>
            </div>

            <div className="ml-6">
              <FollowButton
                id={user.Id}
                refreshPage={RefreshPage}
                logOut={HandleLogOut}
              />
            </div>
          </div>

          <div className="flex items-center mt-2">
            <MusicalNoteIcon className="w-5 h-5" />
            <div className="ml-1 text-s">{user.PublishedLevelsCount}</div>

            <UserGroupIcon className="ml-1 w-5 h-5" />
            <div className="ml-1 text-s">{user.FollowerCount}</div>

            <UserPlusIcon className="ml-1 w-5 h-5" />
            <div className="ml-1 text-s">{user.FollowingCount}</div>
          </div>
        </div>

        <div className="mb-1"></div>

        <Sidebar
          setPage={setPage}
          buttonNames={["Levels", "Following", "Followers", "Liked Levels"]}
        />

        <div className="mt-1 content content-padding md:hidden">
          {GetCurrentPage()}
        </div>
      </div>

      <div className="ml-1 content content-padding md:block max-xl:hidden w-fill">
        {GetCurrentPage()}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  if (!id)
    return {
      props: {},
    };

  let userId = id.toString();

  const userProp = await GetUser(userId);
  if (userProp == null)
    return {
      props: {
        userProp: { Id: id },
      },
    };
  const levelsProp = await GetLevelsByUser(userId, 0, 6);

  return {
    props: {
      userProp,
      levelsProp,
    },
  };
};
