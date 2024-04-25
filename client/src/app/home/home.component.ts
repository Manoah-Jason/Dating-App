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
