import { FC, useEffect, useState } from "react";
import UserProvider, { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { CheckIfFollowed, GetUser } from "@/api/api-users";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface FollowButtonProps {
  id: string;
}
const FollowButton: FC<FollowButtonProps> = ({ id }) => {
  const [followText, setFollowText] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.userId || !user?.sessionId) return;

    CheckIfFollowed(user.userId, user.sessionId).then((response) => {
      if (response) setFollowText("Unfollow");
      else setFollowText("Follow");
    });
  });

  if (user?.sessionId == "") {
    // If user isn't logged in or if following is undefined
    return <></>;
  }

  if (user?.userId == id) {
    return (
      <button
        type="submit"
        className="bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transistion-colors w-1/3"
      >
        Settings
      </button>
    );
  } else
    return (
      <button
        type="submit"
        className="bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transistion-colors w-1/3"
      >
        {followText}
      </button>
    );
};

export default FollowButton;

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
