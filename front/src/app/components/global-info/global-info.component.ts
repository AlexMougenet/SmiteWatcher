import { Component, Input } from '@angular/core';
import { Match } from 'src/app/services/model/match.model';
import { TIER } from 'src/app/services/model/tier.model';

@Component({
  selector: 'app-global-info',
  templateUrl: './global-info.component.html',
  styleUrls: ['./global-info.component.scss']
})
export class GlobalInfoComponent {
  @Input() stats: any;
  @Input() matches: Match[];

  constructor() {}

  public percent(stat) {
    return Math.floor(stat*100);
  }
  public round(stat) {
    return (Math.floor(stat*100)/100);
  }
  public floor(stat, toLocal=false) {
    if (toLocal) {
      return Math.floor(stat).toLocaleString();
    }
    return Math.floor(stat);
  }

  public tierToRank(tier: number) {
    return TIER[tier].rank;
  }

  public numberToRoman(tier: number) {
    if (tier < 26) { // masters and grand masters doesn't have any division
    return TIER[tier].division;
    }
  }

}
