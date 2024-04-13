import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'client';
  users: any;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {    
    this.http.get('https://localhost:5001/api/Users')
      .subscribe(
        {
          next: response => this.users = response,
          error: error => console.log(error),
          complete: () => console.log(this.users)
        }
      )
  }
  
}
