import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mobile-player',
  imports: [CommonModule],
  templateUrl: './mobile-player.component.html',
  styleUrl: './mobile-player.component.scss'
})
export class MobilePlayerComponent implements OnChanges {
  @Input() name!: string; 
  @Input() playerActive: boolean = false;
  @Input() playerIndex!: number;
  @Input() image: string = '1.webp';

  @Output() playerRemoved = new EventEmitter<number>();
  constructor(private host: ElementRef<HTMLElement>){ }

  removePlayer(index: number){
  this.playerRemoved.emit(index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('playerActive' in changes && this.playerActive) {
      this.scrollIntoViewIfNeeded();
    }
  }

  private scrollIntoViewIfNeeded(){
    try{
      this.host.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }catch(err){
    }
  }
}
