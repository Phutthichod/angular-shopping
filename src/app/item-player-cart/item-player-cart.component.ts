import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../data';

@Component({
  selector: 'app-item-player-cart',
  templateUrl: './item-player-cart.component.html',
  styleUrls: ['./item-player-cart.component.scss']
})
export class ItemPlayerCartComponent implements OnInit {

  @Input() player!: Player;
  @Input() count!: number;
  @Output() removePlayer = new EventEmitter<number>();

  ngOnInit(): void {
  }

  onRemove(){
    console.log("remove")
    this.removePlayer.emit(this.player.id as number);
  }

}
