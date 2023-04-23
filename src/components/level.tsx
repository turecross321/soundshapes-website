import { apiUrl } from "@/api/api-client";
import { LevelResponse } from "@/api/types/level-responses";
import { FC, useState } from "react";
import { HeartIcon, PlayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface LevelProps {
  level: LevelResponse;
}

const Level: FC<LevelProps> = ({ level }) => {
  return (
    <div className="bg-black rounded-lg level-content bg-opacity-50">
      <div className="mb-2">
        <Link href={`/level/${level.Id}`}>
          <img
            src={apiUrl + `level/${level.Id}/thumbnail`}
            className="rounded"
            alt="thumbnail"
          />
        </Link>
      </div>
      <h3 className="text-xl truncate">
        <Link href={`/level/${level.Id}`}>{level.Name} </Link>
      </h3>
      <div className="flex justify-between items-center">
        <h4 className="text-sm truncate">
          <Link href={`/profile/${level.AuthorId}`}>
            {"by " + level.AuthorName}
          </Link>
        </h4>
        <div className="flex">
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
    </div>
  );
};

export default Level;
