
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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

constructor(private accountService :AccountService,private toastr :ToastrService){}

ngOnInit():void{
this.initializeForm();
}

initializeForm()
{
  this.registerForm = new FormGroup({
    username: new FormControl('Hello',Validators.required), // Initialize username FormControl
    password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),  // Initialize password FormControl
    confirmPassword:new FormControl('',[Validators.required,this.matchValues('password')])
  });
  this.registerForm.controls['password'].valueChanges.subscribe(
    {
      next:()=>this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    }
  )
}
matchValues(matchTo:string):ValidatorFn
{
  return(control:AbstractControl)=>{
    return control.value===control.parent?.get(matchTo)?.value?null:{noMatching:true}
  }
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
