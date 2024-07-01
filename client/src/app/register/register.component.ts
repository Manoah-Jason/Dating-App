
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators,ValidationErrors, FormBuilder  } from '@angular/forms';
import { r3JitTypeSourceSpan } from '@angular/compiler';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 @Input() usersFromHomeComponent:any;
 @Output() cancelRegister=new EventEmitter();
 registerForm:FormGroup=new FormGroup({});
model:any={}
maxDate = new Date();
validationErrors: any;

constructor(private fb: FormBuilder,private accountService :AccountService,private toastr :ToastrService){}

ngOnInit():void{
this.initializeForm();
}

initializeForm() {
  this.registerForm = this.fb.group({
    gender: ['male'],
    username: ['', Validators.required],
    knownAs: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    confirmPassword: ['', [Validators.required, this.matchValues('password')]],
  });

  this.registerForm.controls['password'].valueChanges.subscribe(() => {
    this.registerForm.controls['confirmPassword'].updateValueAndValidity();
  });
}
matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      const match = control.parent?.get(matchTo);
      if (match && control.value !== match.value) {
          return { notMatch: true };
      }
      return null;
  };
}


register()
{
  debugger;

  console.log(this.registerForm?.value);
//   this.accountService.register(this.registerForm?.value).subscribe
//   (
// {
// next:response=>{
//   console.log(response);
//   this.cancel();
// },
// error:error=>this.toastr.error(error.error)

//}
//)
}

cancel()
{
  this.cancelRegister.emit(false);
}

}
