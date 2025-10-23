export class Game{
    public players: string[] = [];
    public stack: string[] = [];
    public images: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer : number = 0;
    public pickCardAnimation = false;
    public currentCard: string | undefined = '';
    public history: string[] = [];
    public playerName: string = '';

    constructor(){
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);
    }

    toJson(){
      return {
        players : this.players,
        stack : this.stack,
        images : this.images,
        playedCards : this.playedCards,
        currentPlayer : this.currentPlayer,
        pickCardAnimation : this.pickCardAnimation,
        currentCard: this.currentCard,
        history : this.history,
      }
    }

toGerType(cardType: string){
  if (cardType === 'spade') {
    return 'Pik'
  }else if(cardType === 'clubs'){
    return 'Kreuz'
  }else if(cardType === 'diamonds'){
    return 'Karo'
  }else{
    return 'Herz'
  }
}

getRuleInfo(cardNumber: string){
  if (cardNumber === '1'){
    return 'Ass (Waterfall)'
  }else if(cardNumber === '2'){
    return '2 (Du)'
  }else if(cardNumber === '3'){
    return '3 (Ich)'
  }else if(cardNumber === '4'){
    return '4 (Frauen)'
  }else if(cardNumber === '5'){
    return '5 (Daumenmeister)'
  }else if(cardNumber === '6'){
    return '6 (Männer)'
  }else if(cardNumber === '7'){
    return '7 (Himmel)'
  }else if(cardNumber === '8'){
    return '8 (Partner)'
  }else if(cardNumber === '9'){
    return '9 (Reim)'
  }else if(cardNumber === '10'){
    return '10 (Kategorie)'
  }else if(cardNumber === '11'){
    return 'Bube (Regel)'
  }else if(cardNumber === '12'){
    return 'Dame (Fragemaster)'
  }else{
    return 'König (King’s Cup)'
  }
}



}
function shuffle(array: string[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

