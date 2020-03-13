import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {

  constructor(private api: ApiService) {}

  public login(username: string, password: string) {
    return this.api.requester.post(this.api.urls.login, { username, password})
  }

  public persistUser() {
    localStorage.setItem('analytics', 'true');
  }

}
