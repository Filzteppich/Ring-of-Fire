import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { addDoc, collection } from 'firebase/firestore';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);
  constructor(private Router: Router){

  }

  async newGame(){
    let game = new Game();
    await addDoc(collection(this.firestore, "games"), game.toJson()).then((gameInfo) => {
      console.log(gameInfo.id);
      this.Router.navigateByUrl('/game/' + gameInfo.id);
      
    })
  }

}
