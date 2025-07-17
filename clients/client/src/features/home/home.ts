import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { signal } from '@angular/core';
import { Register } from '../account/register/register';
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnChanges {
  @Input() membersFromApp: User[] = [];

  protected registerMode = signal(false);

  ngOnInit() {
    // Initial setup or other logic can go here.
  }

  // Use ngOnChanges to listen for changes to the @Input property
  ngOnChanges(changes: SimpleChanges) {
    if (changes['membersFromApp']) {
      console.log('membersFromApp:', this.membersFromApp);
    }
  }

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
