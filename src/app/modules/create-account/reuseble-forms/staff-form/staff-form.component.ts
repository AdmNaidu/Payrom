import { Component, OnInit,forwardRef, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,NG_VALUE_ACCESSOR,FormBuilder,
  FormGroup,Validators,FormControl,NG_VALIDATORS, Validator
} from '@angular/forms';
import {Subscription} from 'rxjs'


export interface StaffFormValues {
    staffName: string;
    pContactNo: number;
    sContactNumber: number;
    joiningDate:Date;
    staffVisaNumber:number;
    salary:number;
    staffBankName:string;
    staffAcNumber:string
}
@Component({
    selector: 'app-staff-form',
    templateUrl: './staff-form.component.html',
    styleUrls: ['./staff-form.component.scss'],
    providers:[
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting:forwardRef(()=>StaffFormComponent),
            multi:true
        },
        {
            provide: NG_VALIDATORS,
            useExisting:forwardRef(()=>StaffFormComponent),
            multi:true
        }
    ]
})
export class StaffFormComponent implements ControlValueAccessor, OnDestroy ,Validator {

    staffForm:FormGroup
    subscriptions: Subscription[]=[];

    get value():StaffFormValues{
        return this.staffForm.value;
    }
    set value(value: StaffFormValues){
        this.staffForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb:FormBuilder) { 
        
        this.staffForm = this.fb.group({
            staffName: new FormControl("",[Validators.required]),
            pContactNo: new FormControl("",[Validators.required]),
            sContactNumber: new FormControl("",[Validators.required]),
            joiningDate:new FormControl("",[Validators.required]),
            staffVisaNumber:new FormControl("",[Validators.required]),
            salary:new FormControl("",[Validators.required]),
            staffBankName:new FormControl("",[Validators.required]),
            staffAcNumber:new FormControl("",[Validators.required]),
        })
        this.subscriptions.push(
            this.staffForm.valueChanges.subscribe(value=>{
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
        if(value === null){this.staffForm.reset();}
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
        return this.staffForm.valid ? null : { profile: { valid: false } };
    }

}
