import { LevelResponseWrapper } from "@/api/types/level-responses";
import { FC, useEffect, useRef, useState } from "react";
import Level from "./level";
import PreviousPageButton from "./previous-page-button";
import NextPageButton from "./next-page-button";

interface LevelProps {
  levelWrapper: LevelResponseWrapper;
  pageSize: number;
  fromProp: number;
  dataFetcher: (
    from: number,
    count: number
  ) => Promise<LevelResponseWrapper | null>;
}

const Levels: FC<LevelProps> = ({
  levelWrapper,
  fromProp,
  pageSize,
  dataFetcher,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [from, setFrom] = useState<number>(fromProp);
  const [levels, setLevels] = useState<LevelResponseWrapper>(levelWrapper);
  const [loadedFrom, setLoadedFrom] = useState<number>(0);

  function NextPage() {
    let page = currentPage + 1;
    setCurrentPage(page);
    setFrom(pageSize * page);
  }

  function PreviousPage() {
    let page = currentPage - 1;
    setCurrentPage(page);
    setFrom(pageSize * page);
  }

  useEffect(() => {
    async function LoadLevels() {
      let response = await dataFetcher(from, pageSize);
      if (response) {
        setLevels(response);
      }
      setLoadedFrom(from);
    }

    if (currentPage == 0) {
      setLevels(levelWrapper);
      setLoadedFrom(from);
    } else LoadLevels();
  }, [currentPage]);

  return (
    <>
      <div>
        <div className="items-center flex justify-between">
          <div className="grid gap-4 md:grid-cols-3 grid-rows-2">
            {levels.Levels.slice(0, pageSize).map((level, index) => (
              <div key={index}>
                <Level level={level} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="text-base">
          {currentPage + 1} / {Math.ceil(levelWrapper.Count / pageSize)}
        </div>

        <div>
          <div>
            {loadedFrom > 0 ? (
              <PreviousPageButton callback={PreviousPage} />
            ) : null}
          </div>
          <div>
            {loadedFrom + pageSize < levelWrapper.Count ? (
              <NextPageButton callback={NextPage} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Levels;
