import { Component } from '@angular/core';
import { SmiteGuruService } from 'src/app/services/services/smiteguru.service';
import { Player } from 'src/app/services/model/player.model';
import { Match } from 'src/app/services/model/match.model';
import { QUEUE_ID } from 'src/app/services/model/queue.model';
import { ApiService } from 'src/app/services';
import { God } from 'src/app/services/model/god.model';

@Component({
  selector: 'app-home',
  providers: [
    SmiteGuruService,
    ApiService
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage {
  players = {
    1: [],
    2: [],
    3: [],
  }
  stats = {
    1: null,
    2: null,
    3: null,
  }
  showSearchResults = {
    1: true,
    2: true,
    3: true,
  }
  matches = {
    1: [],
    2: [],
    3: [],
  }
  queues: any;

  filter = {
    1: {
      queue: 450,
      god: {}
    },
    2: {
      queue: 450,
      god: {}
    },
    3: {
      queue: 450,
      god: {}
    }
  }

  objectKeys = Object.keys;

  constructor(private smiteguru: SmiteGuruService, public api: ApiService) {
    this.search(1, 'elvien');
    this.search(2, 'naytars');
    this.search(3, 'antraxxe');
    this.queues = QUEUE_ID;
  }

  public setQueue(col: number, qId: string) {
    this.filter[col].queue = parseInt(qId, 10) || null;
  }

  public setGod(col: number, g: God) {
    this.filter[col].god = g;
  }

  public search(col: number, username: string) {
    this.smiteguru.search(username).then(p => {
      this.players[col] = p.data;
      this.showSearchResults[col] = true;
    });
  }

  public display(col: number, player: Player) {
    this.smiteguru.historic(`${player.id}-${player.name}`).then(r => {
      const matches = r.data.matches.data;
      this.matches[col] = matches;
      this.showSearchResults[col] = false;
    });

    this.smiteguru.stats(`${player.id}-${player.name}`).then(r => {
      this.stats[col] = r.data.queues[450];
    });
  }

  public showMatch(col: number, m: Match) {
    let res = true;
    if (this.filter[col].queue) {
      if (this.filter[col].queue && m.queue_id !== this.filter[col].queue) {
        res = false;
      }
    }
    if (this.filter[col].god) {
      if (this.filter[col].god.id && m.players.find(p => p.build !== undefined).champion !== this.filter[col].god.id) {
        res = false;
      }
    }
    return res;
  }

}
