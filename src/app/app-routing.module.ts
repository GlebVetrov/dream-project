import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { RestorePasswordComponent } from "./auth/restore-password/restore-password.component";
import { SetNewPasswordComponent } from "./auth/set-new-password/set-new-password.component";
import { LinkExpiredComponent } from "./auth/link-expired/link-expired.component";
import { CompanySettingsComponent } from "./company-settings/company-settings.component";

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "restore-password", component: RestorePasswordComponent },
  { path: "set-new-password", component: SetNewPasswordComponent },
  { path: "link-expired", component: LinkExpiredComponent },
  { path: "company-settings", component: CompanySettingsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
