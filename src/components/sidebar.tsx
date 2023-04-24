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
    <div className="content content-padding space-y-2">
      {buttonNames.map((button, index) => (
        <button
          className="text-white py-2 rounded hover:bg-gray-600 transistion-colors w-full bg-gray-700"
          onClick={() => ClickButton(index)}
          key={index}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
