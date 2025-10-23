import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from "../../../node_modules/@angular/common";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  allProfilePictures = ['1.webp', '2.png', 'monkey.png', 'pinguin.svg', 'serious-woman.svg', 'winkboy.svg', 'abe.jpg', 'pikachu.jpeg', 'charmander.jpeg','squirtle.jpeg', 'yuji.jpg', 'nobara.jpg','gojo.jpg', 'nezuko.jpg','tanjiro.jpg', 'shinobu.png','zenitzu.jpg', 'zelda.webp', 'saitama.jpg', ]

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>){}

  closeDialog(){
    this.dialogRef.close();
  }

  selectPicture(){

  }
}
