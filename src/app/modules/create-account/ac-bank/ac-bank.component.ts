import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { AddressFormComponent } from '../reuseble-forms/address-form/address-form.component';
import { BankFormComponent } from '../reuseble-forms/bank-form/bank-form.component';
import { CardFormComponent } from '../reuseble-forms/card-form/card-form.component';
import { LicenceFormComponent } from '../reuseble-forms/licence-form/licence-form.component';
import { PersonalComponent } from '../reuseble-forms/personal/personal.component';
import { StaffFormComponent } from '../reuseble-forms/staff-form/staff-form.component';
@Component({
  selector: 'app-ac-bank',
  templateUrl: './ac-bank.component.html',
  styleUrls: ['./ac-bank.component.scss']
})
export class AcBankComponent implements OnInit {
    @ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
    @ViewChild(CardFormComponent) CardFormComponent: CardFormComponent;
    @ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
    @ViewChild(AddressFormComponent) AddressFormComponent: AddressFormComponent;
    @ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;
    @ViewChild(StaffFormComponent) StaffFormComponent: StaffFormComponent;

    bankAccountForm!:FormGroup;
    personalDetails!: FormGroup;
    addressDetails!: FormGroup;
    staffDetails!: FormGroup
    cardDetails!: FormGroup;
    bankDetails !: FormGroup;
    basic_step=false;
    personal_step = false;
    address_step = false;
    bank_step =false;
    card_step=false;
    license_step=false;
    staff_step=false;
    education_step = false;
    step = 1;
    hr_Tag:boolean=false
    constructor(private fb:FormBuilder) { }

    ngOnInit(): void {
        this.bankAccountForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
              ])],
            cnfPassword: ['', Validators.required],
            personalDetails : new FormControl(""),
            cardDetails: new FormControl(""),
            bankDetails: new FormControl(""),
            addressDetails:new FormControl(""),
            licenseDetails:new FormControl(""),
            staffDetails:new FormControl("")
        } 
        // { validator: this.checkPassword("password", "cnfPassword") }
        )}
    checkPassword(PW: string, cnfPW: string) {
        return (group: FormGroup) => {
          if (group.controls[PW].value !== group.controls[cnfPW].value) {
            group.controls[cnfPW].setErrors({ checkPassword: true });
          } else { group.controls[cnfPW].setErrors(null); }
    
        }
      }

    next(){
        console.log(":&&&&&&&&&&&&&&&&&&&&&&&&&&&",this.step)
        if(this.step==1){
          // if (this.bankAccountForm.controls.name.valid,this.bankAccountForm.controls.password.valid,
          //   this.bankAccountForm.controls.email.valid,this.bankAccountForm.controls.cnfPassword.valid) {
            this.basic_step = true;
            this.step++
            // }
        }else if (this.step == 2) {
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

    previous(){
        this.step--
        if(this.step==1){
        this.basic_step = false;
        }else if(this.step==2){
        this.personal_step = false;
        }else if(this.step == 3){
        this.card_step = false;
        }else if(this.step ==4){
        this.bank_step =false;
        
        }else if(this.step ==5){
        this.address_step =false;
        
        }else if(this.step ==6){
        this.license_step =false;
        
        }else if(this.step ==7){
        this.staff_step =false;
        
        }
    }

    get f(){
        return this.bankAccountForm.controls;
    }
    onSubmit() {
        console.log('bankAccountForm details', this.bankAccountForm.value);
    }

}
