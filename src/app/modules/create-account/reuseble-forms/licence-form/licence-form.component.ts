import { Component, OnInit,forwardRef, OnDestroy } from '@angular/core';
import {
    ControlValueAccessor,NG_VALUE_ACCESSOR,FormBuilder,
    FormGroup,Validators,FormControl,NG_VALIDATORS, Validator
} from '@angular/forms';
import {Subscription} from 'rxjs';

export interface LicenseFormValues {
    licencerName: string;
    companyName: string;
    licenceNumber: number;
    licenseExpiry:Date;
    attachLicenseCopy:string;
    establishNumber:number;
    attachEcCopy:string
}

@Component({
    selector: 'app-licence-form',
    templateUrl: './licence-form.component.html',
    styleUrls: ['./licence-form.component.scss'],
    providers:[
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting:forwardRef(()=>LicenceFormComponent),
            multi:true
        },
        {
            provide: NG_VALIDATORS,
            useExisting:forwardRef(()=>LicenceFormComponent),
            multi:true
        }
    ]
})
export class LicenceFormComponent implements ControlValueAccessor, OnDestroy ,Validator {
    licenceForm:FormGroup;
    subscriptions: Subscription[]=[];

    get value():LicenseFormValues{
        return this.licenceForm.value;
    }
    set value(value: LicenseFormValues){
        this.licenceForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb:FormBuilder) {
        this.licenceForm = this.fb.group({
            licencerName:new FormControl("",[Validators.required]), 
            companyName:new FormControl("",[Validators.required]), 
            licenceNumber: new FormControl("",[Validators.required]),
            licenseExpiry: new FormControl("",[Validators.required]),
            attachLicenseCopy:["",Validators.required],
            establishNumber:["",Validators.required],
            attachEcCopy:["",Validators.required],
        })
        this.subscriptions.push(
            this.licenceForm.valueChanges.subscribe(value=>{
                this.onChange(value);
                this.onTouched();
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s=>s.unsubscribe());
    }
    writeValue(value: any): void {
        if(value) this.value =value;
        if(value === null){this.licenceForm.reset();}
    }
    registerOnChange(fn: any): void {
        this.onChange =fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched =fn;
    }
   

    // ngOnInit(): void {
    // }

    onChange: any = () => {};
    onTouched: any = () => {};

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.licenceForm.valid ? null : { profile: { valid: false } };
    }
}
