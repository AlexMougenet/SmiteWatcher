import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match, MatchPlayer } from 'src/app/services/model/match.model';
import { QUEUE_ID } from '../../services/model/queue.model';
import { SmiteService } from 'src/app/services';
import { Player } from 'src/app/services/model/player.model';

@Component({
  selector: 'app-match-result',
  providers: [
    SmiteService
  ],
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.scss']
})
export class MatchResultComponent implements OnInit {
  @Input() match: Match;
  @Output() display: EventEmitter<any> = new EventEmitter();
  player: MatchPlayer;
  championName: string;
  bannedChampionNamesTeam1: string[] = [];
  bannedChampionNamesTeam2: string[] = [];

  team1: MatchPlayer[];
  team2: MatchPlayer[];

  items = {
    actives: {},
    build: {}
  }

  constructor(private smite: SmiteService) {}
  
  ngOnInit() {
    this.player = this.match.players.find(p => p.build !== undefined);
    this.championName = this.smite.getChampionNameById(this.player.champion);
    this.team1 = this.match.players.filter(p => p.team === 1);
    this.team2 = this.match.players.filter(p => p.team === 2);

    if (this.match.bans) {
      this.match.bans.forEach((id,i) => {
        if (i%2) {
          this.bannedChampionNamesTeam2.push(this.smite.getChampionNameById(id));
        } else {
          this.bannedChampionNamesTeam1.push(this.smite.getChampionNameById(id));
        }
      });
    }
  }

  public getQueueName() {
    return QUEUE_ID[`${this.match.queue_id}`];
  }

  public date() {
    const diffH = Math.floor((new Date().getTime() - new Date(this.match.updated).getTime()) / (1000*60*60));
    if (diffH < 24) {
      if (diffH === 1) {
        return `${diffH} hour ago`;
      }
      return `${diffH} hours ago`;
    }
    const days = Math.floor(diffH / 24);
    if (days === 1) {
      return `${days} day ago`;
    }
    return `${days} days ago`;
  }

}
