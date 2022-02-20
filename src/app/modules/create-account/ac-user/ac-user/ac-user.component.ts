import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-ac-user',
    templateUrl: './ac-user.component.html',
    styleUrls: ['./ac-user.component.scss']
})
export class AcUserComponent implements OnInit {
    accountForm!:FormGroup;
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

        this.accountForm = this.fb.group({
            name: new FormControl('',[Validators.required]),
            email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            cnfPassword: ['', Validators.required],
            personalDetails : new FormControl(""),
            cardDetails: new FormControl(""),
            bankDetails: new FormControl(""),
            addressDetails:new FormControl(""),
            licenseDetails:new FormControl(""),
            staffDetails:new FormControl("")
        })
        this.staffPOSForm = this.fb.group({
            staffName : new FormControl('',[Validators.required]),
            staffPassword: ['', [Validators.required, Validators.minLength(8)]],
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
        }else if(this.step ==2){
            this.personal_step =true;
            this.step++
        }else if(this.step == 3){
            this.card_step =true;
            this.step++
        }else if(this.step ==4){
            this.bank_step =true;
            this.step++;
        }else if(this.step ==5){
            this.address_step =true;
            this.step++;
        }else if(this.step ==6){
            this.license_step =true;
            this.step++;
        }else if(this.step ==7){
            this.staff_step =true;
            this.step++;
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
        return this.accountForm.controls;
    }
    onSubmit() {
        console.log('Submit', this.accountForm.value);
        this.accountForm.reset();
        this.step=1
    }

}
