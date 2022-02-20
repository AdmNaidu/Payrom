import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TotalItemsComponent } from './total-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: TotalItemsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [TotalItemsComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TotalItemsModule { }
