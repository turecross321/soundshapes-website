import { FC, useEffect, useState } from "react";
import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import { useContext } from "react";
import { CheckIfFollowed, FollowUser } from "@/api/api-users";

interface FollowButtonProps {
  id: string;
  logOut: () => void;
  refreshPage: () => void;
}
const FollowButton: FC<FollowButtonProps> = ({ id, logOut, refreshPage }) => {
  const [following, setFollowing] = useState<boolean>(false);

  const { session } = useContext(SessionContext);

  useEffect(() => {
    async function Fetch() {
      if (!session?.Id) return;

      setFollowing(await CheckIfFollowed(id));
    }

    Fetch();
  });

  async function Follow() {
    setFollowing(true);
    await FollowUser(id, true);
    refreshPage();
  }

  async function UnFollow() {
    setFollowing(false);
    await FollowUser(id, false);
    refreshPage();
  }

  if (!session?.Id) {
    // If user isn't logged in or if following is undefined
    return <></>;
  }

  if (session.UserId == id) {
    return (
      <button type="submit" className="fancy-button ml-4" onClick={logOut}>
        Log out
      </button>
    );
  } else
    return (
      <button
        type="submit"
        className="bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transistion-colors follow-button"
        onClick={following ? UnFollow : Follow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    );
};

export default FollowButton;
