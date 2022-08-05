import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlyoInputFontsComponent } from './alyo-input-fonts/alyo-input-fonts.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NameService } from './home/name.services'

//<!--versione 3.1-->

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlyoInputFontsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ NameService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
