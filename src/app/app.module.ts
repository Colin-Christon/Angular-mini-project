import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { RegistrationComponent } from './components/home/registration/registration.component';
import { ConfigurationComponent } from './components/home/configuration/configuration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragAndDropModule } from "@progress/kendo-angular-utils";
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { SuccessComponent } from './components/successfulPage/success/success.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegistrationComponent,
    ConfigurationComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GridModule,
    BrowserAnimationsModule,
    DragAndDropModule,
    HttpClientModule,
    ButtonsModule,
    LabelModule,
    InputsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
