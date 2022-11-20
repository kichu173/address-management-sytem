import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registerAddress: FormGroup;

  // formbuilder is an advantageous service where we can use instead of new keyword for every group as well as control, 
  // we can have single instance of formbuilder injected to constructor and use it elsewhere.
  constructor(private fb: FormBuilder) {
    this.registerAddress = this.fb.group({
        name: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
        email: this.fb.control('', Validators.compose([Validators.required, Validators.pattern(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)])),
        addresses: this.fb.array([]),
    });

    // Pre-filling addresses of form
    this.obj.addresses.forEach(() => {
      this.addAddress();
    })
    this.registerAddress.patchValue(this.obj);
  }

  // Prefill the data (ex: when you are getting data from backend adn you need to pre-populate it on form fields.)
  obj = {
    name: 'Kiran Kumar K',
    email: 'kichu@gmail.com',
    addresses: [
      {
        id: 1,
        cityName: 'city1',
        stateName: 'state1',
        streetName: 'street1',
        landmark: 'landmark'
      },
      {
        id: 2,
        cityName: 'city2',
        stateName: 'state2',
        streetName: 'street2',
        landmark: ''
      }
    ]
  }
  
  public get addressesAsFormArray() : FormArray {
    return this.registerAddress.get('addresses') as FormArray;
  }

  submit() {
    console.log(this.registerAddress.value);
  }

  addAddress() {
    this.addressesAsFormArray.push(
      this.getAddressFormGroup()
    )
  }

  getAddressFormGroup(): FormGroup {
    return this.fb.group({
      id: this.fb.control(this.addressesAsFormArray.controls.length + 1),
      cityName: this.fb.control('', Validators.compose([Validators.required])),
      stateName: this.fb.control('', Validators.compose([Validators.required])),
      streetName: this.fb.control('', Validators.compose([Validators.required])),
      landmark: this.fb.control('')
    }) 
  }

  removeAddress(index: number): void {
    this.addressesAsFormArray.removeAt(index);
  }

  isFieldValid(formGroup: any, formControlName: string) {
    if(formGroup.get(formControlName)?.invalid && (formGroup.get(formControlName)?.touched || formGroup.get(formControlName)?.dirty)) {
      return true;
    }
    return false;
  }

  getFieldErrorByType(formGroup: any, formControlName: string, type: string) {
    return formGroup.get(formControlName)?.errors[type];
  }
}

// JSON payload structure which will be sent to backend
// obj = {
//   name: '',
//   email: '',
//   address: [
//     {
//       cityName: '',
//       stateName: '',
//       streetName: '',
//       landmark: ''
//     }
//   ]
// }
