import { useRouter } from "next/router";
import { CheckIfFollowed, GetUser } from "@/api/api-users";
import { FC, useEffect } from "react";
import { UserResponse } from "@/api/types/user-response";
import Head from "next/head";
import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import FollowButton from "@/components/follow-button";

interface IndexPageProps {
  user: UserResponse;
  userId: string;
}

export default function Page({ user, userId }: IndexPageProps) {
  if (!user) return <>Could not find user.</>;

  return (
    <main>
      <div className="w-80 max-w-screen">
        <div className="flex justify-between">
          <h1 className="text-[23px] font-bold">{user.Username}</h1>
          <FollowButton id={userId} />
        </div>

        <div className="flex items-center mt-1">
          <MusicalNoteIcon className="w-5 h-5" />
          <div className="ml-1 text-s">{user.PublishedLevelsCount}</div>

          <UserGroupIcon className="ml-1 w-5 h-5" />
          <div className="ml-1 text-s">{user.FollowerCount}</div>

          <UserPlusIcon className="ml-1 w-5 h-5" />
          <div className="ml-1 text-s">{user.FollowingCount}</div>
        </div>
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

  const user = await GetUser(userId);
  // Pass user to the page  via props
  return {
    props: {
      user,
      userId: userId,
    },
  };
};
