import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './_services/account.service';
import { User } from './_models/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'client';
  users: any;
  constructor(private http: HttpClient,private accountService:AccountService) { }
  ngOnInit(): void {    
    
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
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

}
