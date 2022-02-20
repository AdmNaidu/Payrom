import { UsersService } from './../../data/services/users.service';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

const routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    UsersService
  ]
})
export class LoginModule { }
