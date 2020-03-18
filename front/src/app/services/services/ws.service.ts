import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { SmiteGuruService } from './smiteguru.service';

@Injectable()
export class WSService {
  subject: WebSocketSubject<any>;

  constructor(private api: ApiService, private smiteguru: SmiteGuruService) {}

  public connect() {
    this.subject = webSocket(`${this.api.WSprotocol}${this.api.backendUrl}${this.api.WSbackendPort}`);
    this.subject.subscribe(
      msg => {
        const info = {type: msg[msg.length-1].type, col: msg[msg.length-1].col};
        msg.pop();
        console.log('msg', msg, info);
        if (info.type === 'search') {
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
        }
        if (info.type === 'historic') {
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
        if (info.type === 'stats') {
          if (msg[0].queues[450]) {
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
      },
      err => console.error(err),
      () => console.log('complete')
    );
  }

  public send() {
    this.subject.next({message: 'some message'});
  }

  

}
