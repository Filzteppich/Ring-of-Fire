import { Component, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { CommonModule} from "../../../node_modules/@angular/common";

@Component({
  selector: 'app-dialog-history',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './dialog-history.component.html',
  styleUrl: './dialog-history.component.scss'
})
export class DialogHistoryComponent implements AfterViewInit {
  @ViewChild('bottomAnchor') bottomAnchor?: ElementRef<HTMLDivElement>;

  constructor( public dialogHistoryRef: MatDialogRef<DialogHistoryComponent>, @Inject(MAT_DIALOG_DATA) public data: { history: string[] } ){}

  closeDialog(){
    this.dialogHistoryRef.close();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollToBottom('smooth'), 0);
  }

  private scrollToBottom(behavior: ScrollBehavior = 'smooth'){
    try{
      const el = this.bottomAnchor?.nativeElement;
      if (el) {
        el.scrollIntoView({ behavior, block: 'end' });
      }
    }catch(e){
    }
  }
}
