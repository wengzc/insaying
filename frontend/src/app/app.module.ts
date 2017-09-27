import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModel } from './core/core.model';
import { HomeComponent } from './home/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    CoreModel,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
