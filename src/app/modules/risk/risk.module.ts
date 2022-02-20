import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RiskComponent } from '../risk/risk.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {SharedModule} from 'src/app/shared/shared.module';
import { RiskPersonalComponent } from './reusable-form/risk-personal/risk-personal.component';
import { RiskCardComponent } from './reusable-form/risk-card/risk-card.component';
import { RiskBankComponent } from './reusable-form/risk-bank/risk-bank.component';
import { RiskAddressComponent } from './reusable-form/risk-address/risk-address.component';
import { RiskLicenseComponent } from './reusable-form/risk-license/risk-license.component';
import { RiskStaffComponent } from './reusable-form/risk-staff/risk-staff.component';
import { RiskTransactionComponent } from './reusable-form/risk-transaction/risk-transaction.component';


const routes: Routes = [
  { path: '', component: RiskComponent, canActivate: [AuthGuard] },
];


@NgModule({
  declarations: [RiskComponent, RiskPersonalComponent, RiskCardComponent, RiskBankComponent, RiskAddressComponent, RiskLicenseComponent, RiskStaffComponent, RiskTransactionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RiskModule { }
