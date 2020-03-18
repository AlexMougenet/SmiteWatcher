import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SmiteGuruService {

  search1$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  search2$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  search3$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  historic1$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  historic2$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  historic3$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  stats1$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  stats2$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  stats3$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private api: ApiService) {}

  public search(col: number, username: string) {
    return this.api.requester.post(this.api.urls.smiteguru.search, { username, col });
  }
  public getSearch1() {
    return this.search1$;
  }
  public getSearch2() {
    return this.search2$;
  }
  public getSearch3() {
    return this.search3$;
  }

  public historic(col: number, username: string) {
    return this.api.requester.post(this.api.urls.smiteguru.historic, { username, col });
  }
  public getHistoric1() {
    return this.historic1$;
  }
  public getHistoric2() {
    return this.historic2$;
  }
  public getHistoric3() {
    return this.historic3$;
  }


  public stats(col: number, username: string) {
    return this.api.requester.post(this.api.urls.smiteguru.stats, { username, col });
  }
  public getStats1() {
    return this.stats1$;
  }
  public getStats2() {
    return this.stats2$;
  }
  public getStats3() {
    return this.stats3$;
  }


}
