import { Component, ViewChild, ElementRef } from '@angular/core';
import { SmiteGuruService } from 'src/app/services/services/smiteguru.service';
import { Player } from 'src/app/services/model/player.model';
import { Match } from 'src/app/services/model/match.model';
import { QUEUE_ID } from 'src/app/services/model/queue.model';
import { ApiService, WSService } from 'src/app/services';
import { God } from 'src/app/services/model/god.model';

@Component({
  selector: 'app-home',
  providers: [
    SmiteGuruService,
    ApiService,
    WSService
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage {
  @ViewChild('audio') audio: ElementRef;
  tabs = {
    1: false,
    2: false,
    3: true,
  }
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


  currentPlayer = {
    1: null,
    2: null,
    3: null,
  }

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

  constructor(private smiteguru: SmiteGuruService, public api: ApiService, private ws: WSService) {
    // this.search(1, 'elvien');
    // this.search(2, 'naytars');
    // this.search(3, 'antraxxe');
    this.queues = QUEUE_ID;

    this.ws.connect();

    this.smiteguru.getSearch1().subscribe(s1 => {
      if (s1[0]) {
        this.players[1] = s1;
        this.currentPlayer[1] = s1[0].names[0].searchable;
        this.showSearchResults[1] = true;
      }
    });
    this.smiteguru.getSearch2().subscribe(s2 => {
      if (s2[0]) {
      this.players[2] = s2;
      this.currentPlayer[2] = s2[0].names[0].searchable;
      this.showSearchResults[2] = true;
    }
    });
    this.smiteguru.getSearch3().subscribe(s3 => {
      if (s3[0]) {
      this.players[3] = s3;
      this.currentPlayer[3] = s3[0].names[0].searchable;
      this.showSearchResults[3] = true;
    }
    });

    this.smiteguru.getStats1().subscribe(st1 => {
      this.stats[1] = st1;
      if (st1) {
        this.showSearchResults[1] = false;
      }
    });
    this.smiteguru.getStats2().subscribe(st2 => {
      this.stats[2] = st2;
      if (st2) {
        this.showSearchResults[2] = false;
      }
    });
    this.smiteguru.getStats3().subscribe(st3 => {
      this.stats[3] = st3;
      if (st3) {
        this.showSearchResults[3] = false;
      }
    });

    this.smiteguru.getHistoric1().subscribe(h1 => {
      this.matches[1] = h1;
      if (h1.length) {
        this.showSearchResults[1] = false;
      }
    });
    this.smiteguru.getHistoric2().subscribe(h2 => {
      this.matches[2] = h2;
      if (h2.length) {
        this.showSearchResults[2] = false;
      }
    });
    this.smiteguru.getHistoric3().subscribe(h3 => {
      this.matches[3] = h3;
      if (h3.length) {
        this.showSearchResults[3] = false;
      }
    });
  }

  public setQueue(col: number, qId: string) {
    this.filter[col].queue = parseInt(qId, 10) || null;
  }

  public setGod(col: number, g: God) {
    this.filter[col].god = g;
  }

  public search(col: number, username: string) {

    this.smiteguru.search(col, username).then(p => {

    });
  }

  public display(col: number, player: Player) {

    this.smiteguru.historic(col, `${player.id}-${player.name}`).then(r => {

    });

    this.smiteguru.stats(col, `${player.id}-${player.name}`).then(r => {
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

  public isWin(m: Match) {
    let p = m.players.find(p => p.build !== undefined);
    return p.team === m.winning_team ? 'win' : 'loose';
  }

  public showStats(col: number) {
    return this.stats[col] && this.stats[col].queues && this.stats[col].queues[this.filter[col].queue];
  }

  public selectTab(tab: number) {
    let sound = this.audio.nativeElement;
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    this.tabs = {
      1: false,
      2: false,
      3: false,
    };
    this.tabs[tab] = true;
  }

}
