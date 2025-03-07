import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { ConfigurationComponent } from './components/home/configuration/configuration.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/home/registration/registration.component';
import { SuccessComponent } from './components/successfulPage/success/success.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DragAndDropModule } from '@progress/kendo-angular-utils';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
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
    declarations: [
      AppComponent,
          HomeComponent,
          NavbarComponent,
          RegistrationComponent,
          ConfigurationComponent,
          SuccessComponent,
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-mini-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-mini-project');
  });
});
