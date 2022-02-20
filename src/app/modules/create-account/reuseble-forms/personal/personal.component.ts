import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
    ControlValueAccessor,NG_VALUE_ACCESSOR,FormBuilder,
    FormGroup,Validators,FormControl,NG_VALIDATORS, Validator
} from '@angular/forms';
import {Subscription} from 'rxjs'


export interface PersonalFormValues {
    Name: string;
    city: string;
    emiratesId: number;
    passportNumber:number
}

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    providers:[
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting:forwardRef(()=>PersonalComponent),
            multi:true
        },
        {
            provide: NG_VALIDATORS,
            useExisting:forwardRef(()=>PersonalComponent),
            multi:true
        }
    ]
})
export class PersonalComponent implements ControlValueAccessor, OnDestroy ,Validator{

    form:FormGroup
    subscriptions: Subscription[]=[];

    get value():PersonalFormValues{
        return this.form.value;
    }
    set value(value: PersonalFormValues){
        this.form.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb:FormBuilder) { 
        
        this.form = this.fb.group({
            ownerName:new FormControl("",[Validators.required]), 
            city: new FormControl("",[Validators.required]),
            emiratesId: new FormControl("",[Validators.required]),
            passportNumber:["",Validators.required],
        })
        this.subscriptions.push(
            this.form.valueChanges.subscribe(value=>{
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
        if(value === null){this.form.reset();}
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
        return this.form.valid ? null : { profile: { valid: false } };
    }


}
