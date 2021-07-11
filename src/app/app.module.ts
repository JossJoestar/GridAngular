import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridLibModule } from 'grid-lib';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GridLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
