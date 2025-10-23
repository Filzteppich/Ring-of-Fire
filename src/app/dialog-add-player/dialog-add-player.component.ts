import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-player',
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  standalone: true,
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';

constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>){

}
  onNoClick(){
  }

  closeDialog() {
  this.dialogRef.close();
}
}
