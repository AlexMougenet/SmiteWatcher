import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PAGES } from './pages/index';
import { SERVICES } from './services';
import { COMPONENTS } from './components';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from "angular-notifier";

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES,
    ...COMPONENTS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'middle'
        }
      },
      behaviour: {
        autoHide: 10000,
        onClick: 'hide',
        stacking: 3
      }
    })
  ],
  providers: [
    ...SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
