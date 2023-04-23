import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface NextPageButtonProps {
  callback: () => void;
}

const NextPageButton: FC<NextPageButtonProps> = ({ callback }) => {
  return (
    <button
      className="bg-black bg-opacity-100 text-white py-2 rounded-2xl hover:bg-opacity-50 transistion-colors content-padding"
      onClick={callback}
    >
      <ArrowRightCircleIcon className="w-8" />
    </button>
  );
};

export default NextPageButton;
