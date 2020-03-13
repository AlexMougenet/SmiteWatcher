import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
    ) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!!localStorage.getItem('analytics')) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
