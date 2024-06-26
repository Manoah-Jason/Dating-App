import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/_models/Member';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
members$: Observable<Member[]>|undefined;
  constructor(private memberService:MembersService)
{

}
ngOnInit(): void {
  this.members$=this.memberService.getMembers();
}

}
