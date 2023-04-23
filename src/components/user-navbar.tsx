import { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";

interface SidebarProps {
  setPage: Dispatch<SetStateAction<number>>;
  buttonNames: string[];
}

const Sidebar: FC<SidebarProps> = ({ setPage, buttonNames }) => {
  function ClickButton(index: number) {
    setPage(index);
  }

  return (
    <div className="content content-padding">
      {buttonNames.map((button, index) => (
        <button
          className="text-white py-2 rounded hover:bg-gray-600 transistion-colors w-full bg-gray-700 mb-2"
          onClick={() => ClickButton(index)}
        >
          {buttonNames[index]}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
