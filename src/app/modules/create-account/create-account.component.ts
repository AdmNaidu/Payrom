import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PersonalComponent } from './reuseble-forms/personal/personal.component';
import { CardFormComponent } from './reuseble-forms/card-form/card-form.component';
import { BankFormComponent } from './reuseble-forms/bank-form/bank-form.component';
import { AddressFormComponent } from './reuseble-forms/address-form/address-form.component';
import { LicenceFormComponent } from './reuseble-forms/licence-form/licence-form.component';
import { StaffFormComponent } from './reuseble-forms/staff-form/staff-form.component';
import { CustomValidators } from './custom-validators';
declare var jQuery: any;

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
  @ViewChild(CardFormComponent) CardFormComponent: CardFormComponent;
  @ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
  @ViewChild(AddressFormComponent) AddressFormComponent: AddressFormComponent;
  @ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;
  @ViewChild(StaffFormComponent) StaffFormComponent: StaffFormComponent;


  accountForm!: FormGroup;
  // forms!: FormGroup;
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  staffDetails!: FormGroup
  cardDetails!: FormGroup;
  bankDetails !: FormGroup;
  basic_step = false;
  personal_step = false;
  address_step = false;
  bank_step = false;
  card_step = false;
  license_step = false;
  staff_step = false;
  education_step = false;
  step = 1;
  hr_Tag: boolean = false

  constructor(
    private app: AppManagerService, private fb: FormBuilder
  ) {
    this.app.ShowReportDate = 'false';
  }

  ngOnInit(): void {
    this.loadScripts();

    this.accountForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, {hasNumber: true}),
        CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,{hasSpecialCharacters: true}),
      ])],
      cnfPassword: ['', Validators.compose([Validators.required])],
      personalDetails: new FormControl(""),
      cardDetails: new FormControl(""),
      bankDetails: new FormControl(""),
      addressDetails: new FormControl(""),
      licenseDetails: new FormControl(""),
      staffDetails: new FormControl("")
    }
      //  CustomValidators.passwordMatchValidator('password','cnfPassword')
    )
    // , { validator: this.checkPassword("password", "cnfPassword") }
    // this.forms = this.fb.group({
    // })

  }

  checkPassword(PW: string, cnfPW: string) {
    return (group: FormGroup) => {
      if (group.controls[PW].value !== group.controls[cnfPW].value) {
        group.controls[cnfPW].setErrors({ checkPassword: true });
      } else { group.controls[cnfPW].setErrors(null); }

    }
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";
      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_create_account').addClass("active");
    })(jQuery);
  }
  // get basic() { return this.basicDetails.controls}
  // get personal() { return this.personalDetails.controls; }
  // get card() { return this.cardDetails.controls; }
  // get address() { return this.addressDetails.controls; }
  // get bank() { return this.bankDetails.controls }
  next() {
    console.log(":&&&&&&&&&&&&&&&&&&&&&&&&&&&", this.step)
    if (this.step == 1) {
      // if (this.accountForm.controls.name.valid,this.accountForm.controls.password.valid,
      //   this.accountForm.controls.email.valid,this.accountForm.controls.cnfPassword.valid) {
        this.basic_step = true;
        this.step++
      // }
    } else if (this.step == 2) {
      // if (this.PersonalComponent.form.valid) {
        this.basic_step = true;
        this.step++
      // }

    } else if (this.step == 3) {
      // if (this.CardFormComponent.cardform.valid ){
      this.card_step = true;
      this.step++
      // }
    } else if (this.step == 4) {
      // if (this.BankFormComponent.bankForm.valid) {
        this.bank_step = true;
        this.step++;
      // }
    } else if (this.step == 5) {
      // if (this.AddressFormComponent.addressForm.valid) {
        this.address_step = true;
        this.step++;
      // }
    } else if (this.step == 6) {
      // if (this.LicenceFormComponent.licenceForm.valid) {
        this.license_step = true;
        this.step++;
      // }
    } else if (this.step == 7) {
      // if (this.StaffFormComponent.staffForm.valid) {
        this.staff_step = true;
        this.step++;
      // }
    }
    
  }
  previous() {
    this.step--
    if (this.step == 1) {
      this.basic_step = false;
    } else if (this.step == 2) {
      this.personal_step = false;
    } else if (this.step == 3) {
      this.card_step = false;
    } else if (this.step == 4) {
      this.bank_step = false;

    } else if (this.step == 5) {
      this.address_step = false;

    } else if (this.step == 6) {
      this.license_step = false;

    } else if (this.step == 7) {
      this.staff_step = false;
    }
  }

  get f() {
    return this.accountForm.controls;
  }

  onSubmit() {
    console.log('Submit', this.accountForm.value);
  }
}
