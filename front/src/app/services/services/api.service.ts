import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';

@Injectable()
export class ApiService {
  gods: any;
  backendUrl = environment.backendUrl;
  WSbackendPort = environment.WSbackendPort;
  protocol = environment.protocol;
  WSprotocol = environment.WSprotocol;

  urls = {
    login: '/login',
    smiteguru: {
      search: '/search',
      historic: '/historic',
      stats: '/stats'
    }
  };

  requester = axios.create({
    baseURL: `${environment.protocol}${environment.backendUrl}${environment.backendPort ? environment.backendPort : ''}`,
    timeout: 6000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    ) {
    this.http.get(`assets/gods.json`, { responseType: 'json' }).subscribe(gods => {
      this.gods = gods;
    });

    this.requester.interceptors.request.use(
      onFullFilled => {
        this.loaderService.requests += 1;
        this.loaderService.enable();
        return onFullFilled;
      }
    )
    this.requester.interceptors.response.use(
      response => {
        this.loaderService.responses += 1;
        this.loaderService.disable();
        return response;
      }
    );
  }
}
