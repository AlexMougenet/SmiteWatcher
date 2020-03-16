import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { God } from 'src/app/services/model/god.model';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnChanges {
  @Input() placeholder: string;
  @Input() value: string = '';
  @Input() source: God[];
  @Output() selectGod: EventEmitter<any> = new EventEmitter();

  matches: God[];
  showProps: boolean = false;

  constructor() {}

  public ngOnChanges(c) {
    if (c.source) {
      this.matches = this.source;
    }
  }

  public change(v) {
    let match: God[] = [];
    this.source.forEach(g => {
      if (g.name.toLowerCase().includes(v.toLowerCase())) {
        match.push(g);
        this.matches = match.filter((item, pos) => match.indexOf(item) == pos);
      }
    });
    if (v) {
      this.showProps = true;
    } else {
      this.setGod({name: '', id: null});
    }
  }

  public setGod(g: God) {
    this.showProps = false;
    this.selectGod.emit(g);
  }

  public cancel() {
    this.showProps = false;
  }
  public open() {
    this.showProps = true;
  }

}
