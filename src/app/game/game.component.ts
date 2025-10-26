import { CommonModule } from '@angular/common';
import { Component, inject, Injector, OnInit, runInInjectionContext } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { MobilePlayerComponent } from "../mobile-player/mobile-player.component";
import { DialogHistoryComponent } from '../dialog-history/dialog-history.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent, MobilePlayerComponent],
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  game!: Game;
  firestore: Firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);
  gameId!: string ;
  gameOver: boolean = false;



  constructor(private route: ActivatedRoute, private injector: Injector){
  }
  
  ngOnInit(): void {
    this.game = new Game();
    
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.gameId = params['id'];
          runInInjectionContext(this.injector, () => {
            const gameDoc$ = docData(this.getSingleDocRef(this.gameId));
            gameDoc$.subscribe((gameData: any) => {
          if (gameData) {
            this.game.currentPlayer = gameData.currentPlayer || 0;
            this.game.playedCards = gameData.playedCards || [];
            this.game.players = gameData.players || [];
            this.game.stack = gameData.stack || this.game.stack;
            this.game.images = gameData.images || [];
            this.game.pickCardAnimation = gameData.pickCardAnimation,
            this.game.currentCard = gameData.currentCard
            this.game.history = gameData.history || [];
          }
          
        });
          });
      }
    });
  }

  

  takeCard(){
    
    if (this.game.pickCardAnimation === false && this.game.players.length > 0) {
      
      this.game.pickCardAnimation = true;
      this.game.currentCard = this.game.stack.pop();
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.game.playerName = this.game.players[this.game.currentPlayer]
      this.checkGameOver();
      this.getHistoryInfo( this.game.playerName,  this.game.currentCard);
      this.updateGame();
      
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard!);
        this.updateGame();
      }, 1000);
      }
    }


checkGameOver(){
  if (this.game.stack.length === 0) {
       return this.gameOver = true;
  }else{
    return
  }
}

getHistoryInfo(playerName: string, playerCard: any){
  const cardType = playerCard.split("_")[0];
  const cardNumber = playerCard.split("_")[1];

  const newCardType = this.game.toGerType(cardType);
  const newCardNumber = this.game.getRuleInfo(cardNumber);

  const history = playerName + ": " + newCardType + " " + newCardNumber;
  this.game.history.push(history);
}


editPlayer(index: number){
  const dialogRef = this.dialog.open(EditPlayerComponent);

  dialogRef.afterClosed().subscribe(( change : string) => {
    if (change) {
      if (change === 'delete'){
        this.game.players.splice(index, 1);
        this.game.images.splice(index, 1);
        this.updateGame();
      }else{
        this.game.images[index] = change;
        this.updateGame();
      }
      
    }   
  });
}


openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(( name : string) => {
    if (name && name.length > 0 && this.game) {
      this.game.players.push(name);
      this.game.images.push('1.webp'),
      this.updateGame();
    }   
    
    });
  }

restartGame(){
  const keepPlayers = this.game.players;
  const keepImages = this.game.images;
  this.game = new Game();
  this.game.players = keepPlayers;
  this.game.images = keepImages;
  this.updateGame();
  this.gameOver = false;
}


removePlayer(index: number){
  if (this.game) {
    this.game.players.splice(index, 1);
    this.updateGame();
  }
}

async updateGame(){
  if (this.gameId) {
    let docRef = this.getSingleDocRef(this.gameId);
    await updateDoc(docRef, this.game.toJson()).catch(
      (err) => {
        console.error(err);
      }
    )
  }
}

  getGameRef(){
    return collection(this.firestore, 'games')
  }


  getSingleDocRef(docId: string){
    return doc(collection(this.firestore, 'games'), docId);
  }
 

  openHistory(){
this.dialog.open(DialogHistoryComponent, {data: { history: this.game.history } 
});
  }
}