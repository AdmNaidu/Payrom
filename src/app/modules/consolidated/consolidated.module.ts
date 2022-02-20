import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ConsolidatedComponent } from '../consolidated/consolidated.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: ConsolidatedComponent, canActivate: [AuthGuard] ,pathMatch: 'full'},
];

@NgModule({
  declarations: [ConsolidatedComponent],
  imports: [
    CommonModule,
    DatePickerModule,
    
    RouterModule.forChild(routes),NgSelectModule,FormsModule,ReactiveFormsModule,
  ]
})
export class ConsolidatedModule { }
