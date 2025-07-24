import { Component, Input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { RegisterCreds, User } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],  // Add CommonModule here
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {
  @Input() membersFromHome: User[] = [];
  cancelRegister = output<boolean>();
  creds = { email: '', displayName: '', password: '' };

  // ngOnInit hook for logging values when the component initializes
  ngOnInit() {
    console.log('OnInit: Register:', this.membersFromHome);  // Log members when component initializes
  }

  register() {
    debugger;
    console.log(this.creds);
    console.log('Selected Member:', this.membersFromHome);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Registration cancelled');
  }
}
