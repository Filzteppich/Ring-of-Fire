import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string | undefined = '';

  constructor(){
  }
  
  ngOnInit(): void {
    this.newGame();

  }
  
  newGame(){
    this.game = new Game();
    console.log(this.game);
    

  }

  takeCard(){
    this.pickCardAnimation = true;
    this.currentCard = this.game.stack.pop();
    
    console.log(this.currentCard);
    console.log(this.game);
    
    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game.playedCards.push(this.currentCard!);
    }, 1000);
}
}