import { Component, OnInit } from '@angular/core';
import { SmiteGuruService } from 'src/app/services/services/smiteguru.service';
import { Player } from 'src/app/services/model/player.model';

@Component({
  selector: 'app-home',
  providers: [
    SmiteGuruService
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit {
  players: Player;
  showSearchResults: boolean = false;
  // matches

  constructor(private smiteguru: SmiteGuruService) {
    this.smiteguru.search('elvien').then(p => this.players = p.data);
  }

  ngOnInit() {
  }

  public search(username: string) {
    console.log(username);
    this.smiteguru.search(username).then(p => {
      this.players = p.data;
      this.showSearchResults = true;
    });
  }

  public display(player: Player) {
    this.smiteguru.historic(`${player.id}-${player.name}`).then(r => {
      console.log(r);
      // this.showSearchResults = false;
    });
  }

}
