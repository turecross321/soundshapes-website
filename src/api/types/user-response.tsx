export interface UserResponse {
  Id: string;
  Username: string;
  UserType: number;
  FollowerCount: number;
  FollowingCount: number;
  LikedLevelsCount: number;
  PublishedLevelsCount: number;
  Following: boolean | undefined;
}
