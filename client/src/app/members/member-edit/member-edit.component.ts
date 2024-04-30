import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
member:Member|undefined;
user:User|null=null;
@HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  if (this.editForm?.dirty) {
    $event.returnValue = true;
  }
}
@ViewChild('editForm') editForm: NgForm | undefined;
constructor(private accountService: AccountService, private memberService: MembersService,
  private toastr: ToastrService)
{
  this.accountService.currentUser$.pipe(take(1)).subscribe(
    {
      next:user=>this.user=user
    }
  )
}
ngOnInit(): void {
  this.loadMember();
}
loadMember(){

if(!this.user)return;
this.memberService.getMember(this.user.userName).subscribe({
next:member=>this.member=member

})

}


updateMember() {
  debugger;
  this.memberService.updateMember(this.editForm?.value).subscribe({
    next: _ => {

      this.toastr.success('Profile updated successfully');
      this.editForm?.reset(this.member);
    }
  })
}
}
