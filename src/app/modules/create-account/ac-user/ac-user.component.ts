import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { AddressFormComponent } from '../reuseble-forms/address-form/address-form.component';
import { BankFormComponent } from '../reuseble-forms/bank-form/bank-form.component';
import { CardFormComponent } from '../reuseble-forms/card-form/card-form.component';
import { LicenceFormComponent } from '../reuseble-forms/licence-form/licence-form.component';
import { PersonalComponent } from '../reuseble-forms/personal/personal.component';
import { StaffFormComponent } from '../reuseble-forms/staff-form/staff-form.component';

@Component({
    selector: 'app-ac-user',
    templateUrl: './ac-user.component.html',
    styleUrls: ['./ac-user.component.scss']
})
export class AcUserComponent implements OnInit {
    @ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
    @ViewChild(CardFormComponent) CardFormComponent: CardFormComponent;
    @ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
    @ViewChild(AddressFormComponent) AddressFormComponent: AddressFormComponent;
    @ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;
    @ViewChild(StaffFormComponent) StaffFormComponent: StaffFormComponent;

    storeOwnerForm!:FormGroup;
    branchManagerForm!:FormGroup;
    deliveryPOSForm!:FormGroup;
    staffPOSForm!: FormGroup;
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
    @ViewChild("myNameElem") myNameElem: ElementRef;
    constructor(private fb:FormBuilder) { }

    ngOnInit(): void {

        this.storeOwnerForm = this.fb.group({
            ownerName: new FormControl('',[Validators.required]),
            ownerEmail: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            ownerPassword:['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
              ])],
            ownerCnfPassword: ['', Validators.required],
            personalDetails : new FormControl(""),
            cardDetails: new FormControl(""),
            bankDetails: new FormControl(""),
            addressDetails:new FormControl(""),
            licenseDetails:new FormControl(""),
            staffDetails:new FormControl("")
        })
        this.branchManagerForm = this.fb.group({
            name: new FormControl('',[Validators.required]),
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
        })
        this.deliveryPOSForm = this.fb.group({
            deliveryName : new FormControl('',[Validators.required]),
            deliveryPassword:['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
              ])],
            deliveryEmail: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            deliveryCnfPassword:['', Validators.required],
            merchantID:['', Validators.required],
            storeId:['', Validators.required],
            EINumber:['', Validators.required],
            passportNumber:['', Validators.required],
            visaNumber: ['', Validators.required],
        })
        this.staffPOSForm = this.fb.group({
            staffName : new FormControl('',[Validators.required]),
            staffPassword: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
              ])],  
            staffEmail: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            staffCnfPassword:['', Validators.required],
            merchantID:['', Validators.required],
            storeId:['', Validators.required],
            EINumber:['', Validators.required],
            passportNumber:['', Validators.required],
            visaNumber: ['', Validators.required],
        })
    }

    getId(){
        console.log("66666666666666666666666666666666",this.myNameElem.nativeElement.value);
    }
    subTabs(id:any){
        this.step = 1;
    }
    next(){
        console.log(":&&&&&&&&&&&&&&&&&&&&&&&&&&&",this.step)
        if(this.step==1){
            this.basic_step = true;
            // console.log("&&&&&&&&&&&&&&&&&&",this.basicDetails.status)
                // if (this.basicDetails.invalid) { return  }
            this.step++
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
    //   if(this.step==2){
    //       this.personal_step = true;
    //       //if (this.addressDetails.invalid) { return }
    //           this.step++;
    //   }
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
        return (this.storeOwnerForm.controls,this.branchManagerForm.controls,
            this.deliveryPOSForm.controls,
            this.staffPOSForm.controls);

    }
    // onSubmit() {
    //     console.log('user Form details', this.storeOwnerForm.value,this.branchManagerForm.value,this.deliveryPOSForm.value,this.staffPOSForm.value);
    //     // this.userForm.reset();
    //     // this.storeOwnerForm.reset();
    //     // this.deliveryPOSForm.reset();
    //     // this.staffPOSForm.reset();
    //     this.step=1
    // }
    onOwnerSubmit(){
        console.log('store Owner Details',this.storeOwnerForm.value)
        this.storeOwnerForm.reset();
        this.step=1
    }
    onManagerSubmit(){
        console.log('Branch Manager details',this.branchManagerForm.value)
        this.branchManagerForm.reset();
    }
    onDeliveryPosSubmit(){
        console.log('deliveryPOS details',this.deliveryPOSForm.value)
        this.deliveryPOSForm.reset();
    }
    onStaffPosSubmit(){
        console.log('staffPOS details',this.staffPOSForm.value)
        this.staffPOSForm.reset();
    }
}
