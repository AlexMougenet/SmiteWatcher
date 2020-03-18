import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable()
export class WSService {
  subject: WebSocketSubject<any>;
  

  constructor(private api: ApiService) {

  }

  public connect() {
    console.log('WSService - connect');
    this.subject = webSocket("ws://localhost:8081");
    this.subject.subscribe(
      msg => console.log('msg', msg),
      err => console.error(err),
      () => console.log('complete')
    );
  }

  public send() {
    this.subject.next({message: 'some message'});
  }

  

}
