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

  // items$: Observable<any[]>;


  constructor(private route: ActivatedRoute, private injector: Injector){
    // const aCollection = collection(this.firestore, 'games')
    // this.items$ = collectionData(aCollection);
    // console.log(this.items$);
    // this.items$.subscribe((games) => { console.log(games);
    // })
    // this.addDoc();
  }
  
  ngOnInit(): void {
    this.game = new Game();
    
    this.route.params.subscribe((params) => {
      console.log(params);
      
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
            // Mobile scroll handled within child via Input change
          }
          console.log(gameData);
          
        });
          });
      }
    });
  }

  

  takeCard(){
    
    if (this.game.pickCardAnimation === false && this.game.players.length > 0) {
      if (this.game.stack.length === 0) {
        this.gameOver = true;
      }else{
      this.game.pickCardAnimation = true;
      this.game.currentCard = this.game.stack.pop();
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.game.playerName = this.game.players[this.game.currentPlayer]
      console.log(this.game.players[this.game.currentPlayer]);
      this.getHistoryInfo( this.game.playerName,  this.game.currentCard);
      this.updateGame();
      
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard!);
        this.updateGame();
      }, 1000);
      }

    }
}

getHistoryInfo(playerName: string, playerCard: any){
  const cardType = playerCard.split("_")[0];
  const cardNumber = playerCard.split("_")[1];

  const newCardType = this.game.toGerType(cardType);
  const newCardNumber = this.game.getRuleInfo(cardNumber);

  console.log(playerName + ": " + cardType + " " + cardNumber);
  const history = playerName + ": " + newCardType + " " + newCardNumber;
  this.game.history.push(history);
  console.log("history: " + this.game.history);
  
  //this.updateGame();
}


editPlayer(index: number){
  console.log("player " + index + "has been clicked" );
  const dialogRef = this.dialog.open(EditPlayerComponent);

      dialogRef.afterClosed().subscribe(( change : string) => {
    if (change) {
      if (change === 'delete'){
        this.game.players.splice(index, 1);
        this.game.images.splice(index, 1);
        this.updateGame();
      }else{
        console.log('img ' + change + ' received');
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




removePlayer(index: number){
  if (this.game) {
    this.game.players.splice(index, 1);
    this.updateGame();
  }
}

async updateGame(){
  //this.firestore.collection('games').doc(this.gameId).update(this.game.toJson());
  if (this.gameId) {
    let docRef = this.getSingleDocRef(this.gameId);
    await updateDoc(docRef, this.game.toJson()).catch(
      (err) => {
        console.log(err);
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