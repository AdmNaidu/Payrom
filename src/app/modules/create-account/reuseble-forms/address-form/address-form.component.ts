import { Component, OnInit,forwardRef, OnDestroy } from '@angular/core';
import {
    ControlValueAccessor,NG_VALUE_ACCESSOR,FormBuilder,
    FormGroup,Validators,FormControl,NG_VALIDATORS, Validator
} from '@angular/forms';
import {Subscription} from 'rxjs'
export interface AddressFormValues {
    address: string;
    location: string;
    primaryConatct: number;
    secondaryConatct:number;
    website:string
}
@Component({
    selector: 'app-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
    providers:[
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting:forwardRef(()=>AddressFormComponent),
            multi:true
        },
        {
            provide: NG_VALIDATORS,
            useExisting:forwardRef(()=>AddressFormComponent),
            multi:true
        }
    ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy ,Validator {
    addressForm:FormGroup
    subscriptions: Subscription[]=[];
    get value():AddressFormValues{
        return this.addressForm.value;
    }
    set value(value: AddressFormValues){
        this.addressForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb:FormBuilder) { 
        this.addressForm = this.fb.group({
            address:new FormControl("",[Validators.required]), 
            location: new FormControl("",[Validators.required]),
            primaryConatct: new FormControl("",[Validators.required]),
            secondaryConatct:["",Validators.required],
            website:["",Validators.required]
        })
        this.subscriptions.push(
            this.addressForm.valueChanges.subscribe(value=>{
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
        if(value === null){this.addressForm.reset();}
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
        return this.addressForm.valid ? null : { profile: { valid: false } };
    }

}
