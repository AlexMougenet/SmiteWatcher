import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class SmiteGuruService {

  constructor(private api: ApiService) {}

  public search(username: string) {
    return this.api.requester.post(this.api.urls.smiteguru.search, { username });
  }

  public historic(username: string) {
    return this.api.requester.post(this.api.urls.smiteguru.historic, { username });
  }

  public stats(username: string) {
    return this.api.requester.post(this.api.urls.smiteguru.stats, { username });
  }

}
