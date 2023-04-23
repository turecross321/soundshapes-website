import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface PreviousPageButtonProps {
  callback: () => void;
}

const PreviousPageButton: FC<PreviousPageButtonProps> = ({ callback }) => {
  return (
    <button
      className="bg-black bg-opacity-100 text-white py-2 rounded-2xl hover:bg-opacity-50 transistion-colors content-padding"
      onClick={callback}
    >
      <ArrowLeftCircleIcon className="w-8" />
    </button>
  );
};

export default PreviousPageButton;
