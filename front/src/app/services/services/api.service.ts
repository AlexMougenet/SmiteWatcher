import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  gods: any;
  backendUrl = environment.backendUrl

  urls = {
    login: '/login',
    smiteguru: {
      search: '/search',
      historic: '/historic',
      stats: '/stats'
    }
  };

  requester = axios.create({
    baseURL: environment.backendUrl,
    timeout: 6000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  constructor(private http: HttpClient) {
    this.http.get(`assets/gods.json`, { responseType: 'json' }).subscribe(gods => {
      this.gods = gods;
    });
  }
}
