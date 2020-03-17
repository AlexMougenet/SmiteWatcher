import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() value: string = '';
  @Input() source;
  @Output() selectQueue: EventEmitter<any> = new EventEmitter();

  showProps: boolean = false;
  objectKeys = Object.keys;

  constructor() { }

  public setQueue(q: any) {
    this.showProps = false;
    this.selectQueue.emit(q);
  }

  public cancel() {
    this.showProps = false;
  }
  public open() {
    this.showProps = true;
  }


}
