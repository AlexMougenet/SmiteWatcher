import { Injectable} from '@angular/core'

@Injectable()
export class LoaderService {

  isLoading: boolean = false;
  loadingBar: HTMLElement;
  timeout: any;
  timeoutBar: any;

  requests = 0;
  responses = 0;

  constructor() {
    this.getLoaders();
  }

  getLoaders() {
    this.getLoadingBar();
  }

  getLoadingBar() {
    if (this.loadingBar)
      return;
    this.loadingBar = document.querySelector('.loadingBar');
    if (this.loadingBar && this.isLoading)
      this.enable();
  }

  enable() {
    this.getLoaders();
    clearTimeout(this.timeout);
    this.timeout = null;
    clearTimeout(this.timeoutBar);
    this.timeoutBar = null;

    this.isLoading = true;

    if (this.loadingBar) {
      let weight = 100 / (this.requests * 2);
      let requestsP =  this.requests * weight;
      let responsesP = this.responses * weight;
      let percentage = requestsP + responsesP;
      this.loadingBar.style.width = `${ percentage ? percentage : 100 }%`;

      if (percentage == 100 || percentage == NaN) {
        this.requests = 0;
        this.responses = 0;
      }
    }
  }

  disable() {
    this.getLoaders();
    this.isLoading = false;

    if (this.loadingBar) {
      this.timeoutBar = setTimeout(() => {
        this.loadingBar.style.opacity = '0';
        setTimeout(() => {
          this.loadingBar.style.width = `${ 0 }%`;
          this.loadingBar.style.opacity = '1';
        }, 800);
      }, 400);
    }
  }
}
