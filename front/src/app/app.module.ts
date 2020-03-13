import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PAGES } from './pages/index';
import { SERVICES } from './services';
import { COMPONENTS } from './components';

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES,
    ...COMPONENTS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [...SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
