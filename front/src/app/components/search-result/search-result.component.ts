import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/services/model/player.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() player: Player;

  constructor() { }

  ngOnInit() {
  }

  public date() {
    const diffH = Math.floor((new Date().getTime() - new Date(this.player.seen).getTime()) / (1000*60*60));
    if (diffH < 24) {
      return `${diffH} hours ago`;
    }
    return `${Math.floor(diffH / 24)} days ago`;
  }

  public playtime() {
    return `${Math.floor((this.player.playtime / 60)*100)/100}`;
  }
  
}
