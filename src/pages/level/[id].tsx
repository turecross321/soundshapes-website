import { CheckIfFollowed, GetUser } from "@/api/api-users";
import React, { useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { GetLevel, GetLevelsByUser } from "@/api/api-levels";
import { LevelResponse } from "@/api/types/level-responses";
import {
  HeartIcon,
  MusicalNoteIcon,
  PlayIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { apiUrl } from "@/api/api-client";
import Sidebar from "@/components/user-navbar";
import Leaderboard from "@/components/leaderboard";
import Users from "@/components/users";

interface IndexPageProps {
  level: LevelResponse;
}

export default function Page({ level }: IndexPageProps) {
  const [page, setPage] = useState<number>(0);

  if (!level)
    return (
      <div className="w-80 max-w-screen content content-padding">
        Could not find level.
      </div>
    );

  function GetCurrentPage() {
    if (page == 0) return <Leaderboard />;
    if (page == 1) return <Users />;
  }

  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <div className="w-auto content content-padding mb-1">
            <div className="w-80 flex justify-between items-start">
              <div className="w-56">
                <h1 className="text-3xl font-bold break-words">{level.Name}</h1>
              </div>
              <div className="w-full flex justify-end"></div>
            </div>
            <h2 className="text-base">
              <Link href={`/profile/${level.AuthorId}`}>
                {"by " + level.AuthorName}
              </Link>
            </h2>

            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <PlayIcon className="w-4 h-4 mr-1" />
                <p>{level.TotalPlays}</p>
              </div>

              <div className="flex items-center ml-1">
                <HeartIcon className="w-4 h-4 mr-1" />
                <p>{level.Likes}</p>
              </div>
            </div>
          </div>

          <div className="content thumbnail-padding mb-1">
            <img
              src={apiUrl + `level/${level.Id}/thumbnail`}
              className="rounded w-full h-full"
              alt="thumbnail"
            />
          </div>

          <Sidebar buttonNames={["Leaderboard", "Likes"]} setPage={setPage} />
        </div>
        <div className="ml-1 content content-padding md:block max-xl:hidden">
          {GetCurrentPage()}
        </div>
      </div>

      <div className="mt-1 content content-padding md:hidden">
        {GetCurrentPage()}
      </div>
    </>
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

  let levelId = id.toString();
  let level = await GetLevel(levelId);

  if (!level)
    return {
      props: {},
    };

  return {
    props: {
      level,
    },
  };
};
