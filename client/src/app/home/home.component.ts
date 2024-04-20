import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/User';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
registerMode=false;
users:any;
constructor(private http: HttpClient,private accountService:AccountService)
{

}
ngOnInit():void{
  this.getUsers();
  debugger;
 var k=  this.accountService.currentUser$;
}

getUsers()
{
  this.http.get('https://localhost:5001/api/Users')
    .subscribe(
      {
        next: response => this.users = response,
        error: error => console.log(error),
        complete: () => console.log(this.users)
      }
    )
}
registerToggle()
{
  this.registerMode=!this.registerMode;
}

cancelRegisterMode(event:boolean)
{
  this.registerMode=event;
}
}
