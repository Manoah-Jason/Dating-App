import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member'  

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit{
  @Input() member: Member | undefined;

  ngOnInit(): void {
    debugger;
    console.log(this.member);
    //this.initializeUploader();
  }

}
