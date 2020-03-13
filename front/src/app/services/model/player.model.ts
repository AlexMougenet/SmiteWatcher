export class Player {
  public platform: number;
  public id: number;
  public name: string;
  public seen: string;
  public level: number;
  public region: string;
  public team: string;
  public portal: number;
  public names: PlayerNames[];
  public playtime: number;
}

export class PlayerNames {
  public portal: number;
  public name: string;
  public searchable: string;
}
