import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.component';
import { HomePage } from './pages/home/home.component';
import { PageNotFoundPage } from './pages/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/guard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginPage },
  { path: '**', component: PageNotFoundPage } // 404 PAGE NOT FOUND
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',  onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
