import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/home/registration/registration.component';
import { ConfigurationComponent } from './components/home/configuration/configuration.component';
import { SuccessComponent } from './components/successfulPage/success/success.component';

const routes: Routes = [
  {path: "",redirectTo:"home/register",pathMatch:"full"},
  {path:"home", component:HomeComponent,
    children: [
      {path:"register", component:RegistrationComponent},
      {path:"configure", component:ConfigurationComponent}
    ]
  },
  {path:"success", component:SuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
