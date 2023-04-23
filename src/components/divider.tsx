import { FC } from "react";

interface DividerProps {}

const Divider: FC<DividerProps> = ({}) => {
  return <div className="border-t border-gray-300 my-1 border-opacity-20" />;
};

export default Divider;
