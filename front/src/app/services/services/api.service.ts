import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  backendUrl = environment.backendUrl

  urls = {
    login: '/login',
    smiteguru: {
      search: '/search',
      historic: '/historic'
    }
  };

  requester = axios.create({
    baseURL: environment.backendUrl,
    timeout: 6000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  constructor(
  ) {}
}
