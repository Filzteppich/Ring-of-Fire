import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';;

@Component({
  selector: 'app-game-info',
  imports: [MatCardModule,CommonModule],
  standalone: true,
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnInit, OnChanges{
@Input() card: string | undefined;
@Input() currentPlayer: string | undefined;
@Input() cardStack: number | undefined;


constructor(){
  
}


cardAction = [
  {
    title: "Waterfall (Ass)",
    description: "Alle Spieler beginnen gleichzeitig zu trinken. Der Spieler, der die Karte gezogen hat, darf als Erster aufhören. Danach reihum dürfen die Spieler ebenfalls aufhören."
  },
  {
    title: "Du (2)" ,
    description: "Der Spieler, der die Karte gezogen hat, darf eine Person auswählen, die trinken muss."
  },
  {
    title: "Ich (3)",
    description: "Der Spieler, der die Karte gezogen hat, muss trinken."
  },
  {
    title: "Frauen (4)",
    description: "Alle weiblichen Spieler trinken."
  },
  {
    title: "Daumenmeister (5)",
    description: "Der Spieler, der die Karte gezogen hat, darf jederzeit seinen Daumen unauffällig auf den Tisch legen. Die anderen müssen folgen. Wer es als Letzter bemerkt, trinkt."
  },
  {
    title: "Männer (6)",
    description: "Alle männlichen Spieler trinken."
  },
  {
    title: "Himmel (7)",
    description: "Alle Spieler müssen nach oben zeigen. Wer es als Letzter macht, trinkt."
  },
  {
    title: "Partner (8)",
    description: "Der Spieler wählt einen Partner. Immer wenn einer der beiden trinken muss, trinkt auch der andere."
  },
  {
    title: "Reim (9)",
    description: "Der Spieler sagt ein Wort. Im Uhrzeigersinn muss jeder ein Reimwort nennen. Wer kein Wort findet oder zu lange braucht, trinkt."
  },
  {
    title: "Kategorie (10)",
    description: "Der Spieler nennt eine Kategorie (z. B. Automarken). Jeder muss reihum etwas dazu nennen. Wer nichts mehr weiß, trinkt."
  },
  {
    title: "Regel (Bube)",
    description: "Der Spieler darf eine neue Regel aufstellen, die für alle gilt, bis eine neue Buben-Karte gezogen wird."
  },
  {
    title: "Fragemaster (Dame)",
    description: "Der Spieler darf Fragen stellen. Wer eine beantwortet, muss trinken. Der Titel bleibt, bis eine neue Dame gezogen wird."
  },
  {
    title: "King’s Cup (König)",
    description: "Der Spieler gießt einen Teil seines Getränks in das Glas in der Mitte. Wer den vierten König zieht, muss das Glas austrinken."
  }
]

title: string = '';
description: string = '';

  ngOnChanges(): void {
    if (this.card) {
      if (this.cardStack === 0) {
        this.title = "Game Over"
        this.description = "Keine Karten mehr im Deck"
      }else{
              console.log("current card is " + this.card);
      console.log("currend number is " + this.card?.split("_")[1]);
      this.title = this.cardAction[+this.card.split("_")[1]-1].title;
      this.description = this.cardAction[+this.card.split("_")[1]-1].description;
      console.log(this.currentPlayer);
      }
    }
    
  }
  ngOnInit(): void {
  }
}
