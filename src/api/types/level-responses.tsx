export interface LevelResponse {
  Id: string;
  Name: string;
  AuthorId: string;
  AuthorName: string;
  TotalPlays: number;
  UniquePlays: number;
  Likes: number;
  CompletedByYou?: boolean;
}

export interface LevelResponseWrapper {
  Levels: LevelResponse[];
  Count: number;
}
