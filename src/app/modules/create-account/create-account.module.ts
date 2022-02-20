import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { CreateAcMenusComponent } from './create-ac-menus/create-ac-menus.component';
import {AcBankComponent} from './ac-bank/ac-bank.component'
import { AcPayrowComponent } from './ac-payrow/ac-payrow.component';
import {AcUserComponent} from './ac-user/ac-user.component';
import {AcManagerComponent} from './ac-manager/ac-manager.component';
import { PersonalComponent } from './reuseble-forms/personal/personal.component';
import { CardFormComponent } from './reuseble-forms/card-form/card-form.component';
import { BankFormComponent } from './reuseble-forms/bank-form/bank-form.component';
import { AddressFormComponent } from './reuseble-forms/address-form/address-form.component';
import { StaffFormComponent } from './reuseble-forms/staff-form/staff-form.component';
import { LicenceFormComponent } from './reuseble-forms/licence-form/licence-form.component'

const routes: Routes = [
  { path: '', component: CreateAccountComponent, canActivate: [AuthGuard] ,pathMatch:'full'},
  {path:'ac-manager', component: AcManagerComponent},
  {path:'ac-user', component: AcUserComponent},
  {path:'ac-payrow', component:AcPayrowComponent},
  {path:'ac-bank',component:AcBankComponent}
];

@NgModule({
  declarations: [CreateAccountComponent, CreateAcMenusComponent,AcPayrowComponent,AcBankComponent,AcUserComponent,AcManagerComponent, PersonalComponent, CardFormComponent, BankFormComponent, AddressFormComponent, StaffFormComponent, LicenceFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateAccountModule { }
