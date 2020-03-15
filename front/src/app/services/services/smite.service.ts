import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class SmiteService {

  constructor(private api: ApiService) {}

  public getChampionNameById(id: number) {
    // return this.api.requester.post(this.api.urls.smite.champion, { id });
    let name: string = this.api.gods.find(g => g.id === id).name.toLowerCase();
    if (name.includes(' ')) {
      name = name.split(' ').join('-');
    }
    return name;
  }

}
