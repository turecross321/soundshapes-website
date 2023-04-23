export interface UserResponse {
  Id: string;
  Username: string;
  Online: boolean;
  FollowerCount: number;
  FollowingCount: number;
  LikedLevelsCount: number;
  PublishedLevelsCount: number;
  Following: boolean | undefined;
}
