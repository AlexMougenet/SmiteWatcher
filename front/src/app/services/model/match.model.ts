export class Match {
  public _id: string;
  public match_id: string;
  public platform: number;
  public queue_id: number;
  public season: string;
  public updated: string;
  public duration: number;
  public winning_team: number;
  public players: MatchPlayer[];
  public date_key: string;
  public time: string;
  public region: string;
  public bans: number[];
}

export class MatchPlayer {
  public id: number;
  public name: string;
  public champion: number;
  public team: number;
  public party: number;

  public build: Object;
  public actives: Object;
}