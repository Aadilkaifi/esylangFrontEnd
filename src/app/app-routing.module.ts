import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

const routes: Routes = [
  // {
  //   path: 'common_',
  //   loadChildren: () =>
  //     import(`./all-modules/all-modules.module`).then(
  //       (m) => m.AllModulesModule
  //     ),
  // },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'errorpage', component: ErrorpageComponent },
  { path: '', loadChildren: () => import('./cmn/cmn.module').then(m => m.CmnModule), },
  // { path: '', redirectTo: 'errorpage', pathMatch: 'full' },
  { path: '**', redirectTo: 'errorpage' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// ng generate module cmn --route cmn --module app.module
