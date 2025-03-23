import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { SuccessComponent } from './components/successfulPage/success/success.component';

const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  { path: "register", component: RegistrationComponent },
  { path: "configure", component: ConfigurationComponent },
  { path: "success", component: SuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
