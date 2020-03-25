import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { SmiteGuruService } from './smiteguru.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class WSService {
  subject: WebSocketSubject<any>;

  handshake = true;

  constructor(private api: ApiService, private smiteguru: SmiteGuruService, private router: Router, private notifier: NotifierService) {
    console.log(this);
  }

  public open() {
    this.subject = webSocket(`${this.api.WSprotocol}${this.api.backendUrl}${this.api.WSbackendPort ? this.api.WSbackendPort : ''}`);
    if (this.handshake) {
      this.notifier.notify(
        'success',
        'Connected'
      );
      this.handshake = false;
    }
  }

  public connect() {
    this.open();
    this.subject.subscribe(
      msg => {
        const info = {type: msg[msg.length-1].type, col: msg[msg.length-1].col};

        if (info.type === undefined) {
          msg = JSON.parse(msg);
          this.setSearch({col: 1}, msg.search1);
          this.setSearch({col: 2}, msg.search2);
          this.setSearch({col: 3}, msg.search3);
          this.smiteguru.historic1$.next(msg.historic1);
          this.smiteguru.historic2$.next(msg.historic2);
          this.smiteguru.historic3$.next(msg.historic3);
          this.setStats({col: 1}, [msg.stats1]);
          this.setStats({col: 2}, [msg.stats2]);
          this.setStats({col: 3}, [msg.stats3]);
        } else {

          if (info.type !== 'update') {
            msg.pop();
          }

          if (info.type === 'update') {
            let udpate = {
              search1: this.smiteguru.search1$.value,
              search2: this.smiteguru.search2$.value,
              search3: this.smiteguru.search3$.value,
              historic1: this.smiteguru.historic1$.value,
              historic2: this.smiteguru.historic2$.value,
              historic3: this.smiteguru.historic3$.value,
              stats1: this.smiteguru.stats1$.value,
              stats2: this.smiteguru.stats2$.value,
              stats3: this.smiteguru.stats3$.value,
              type: 'update-response'
            }
            this.subject.next(udpate);
          }
          else if (info.type === 'search') {
            this.setSearch(info, msg);
          }
          else if (info.type === 'historic') {
            this.setHistoric(info, msg);
          }
          else if (info.type === 'stats') {
            this.setStats(info, msg);
          }
        }
      },
      err => {
        this.handshake = true;
        this.open();
        this.error('Connection lost');
        console.error(err);
        // this.router.navigateByUrl('/e', {skipLocationChange: true}).then(() =>
        // this.router.navigate(['/']));
      },
      () => console.log('complete')
    );
  }

  public setSearch(info, msg) {
    switch(info.col) {
      case 1:
        this.smiteguru.search1$.next(msg);
        break;
      case 2:
        this.smiteguru.search2$.next(msg);
        break;
      case 3:
        this.smiteguru.search3$.next(msg);
        break;
    }
    if (msg.length === 0) {
      this.error(`Column n°${info.col} : No profile found`);
    }
  }

  public setHistoric(info, msg) {
    if (msg[0] && msg[0].matches && msg[0].matches.data) {
      switch(info.col) {
        case 1:
          this.smiteguru.historic1$.next(msg[0].matches.data);
          break;
        case 2:
          this.smiteguru.historic2$.next(msg[0].matches.data);
          break;
        case 3:
          this.smiteguru.historic3$.next(msg[0].matches.data);
          break;
      }
    }
    if (msg[0].matches.data.length === 0) {
      this.error(`Column n°${info.col} : Profile is private, or no recent matches were found`);
    }
  }

  public setStats(info, msg) {
    if (msg[0] && msg[0].queues) {
      switch(info.col) {
        case 1:
          this.smiteguru.stats1$.next(msg[0]);
          break;
        case 2:
          this.smiteguru.stats2$.next(msg[0]);
          break;
        case 3:
          this.smiteguru.stats3$.next(msg[0]);
          break;
      }
    }
  }

  public error(msg: string) {
    this.notifier.notify(
      'error',
      msg
    );
  }
}
