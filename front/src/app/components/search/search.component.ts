import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string;
  @Output() search: EventEmitter<any> = new EventEmitter();
  username: string;

  constructor() { }

  ngOnInit() {
  }

}
