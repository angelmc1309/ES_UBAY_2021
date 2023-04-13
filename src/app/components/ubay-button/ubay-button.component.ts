import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ubay-button',
  templateUrl: './ubay-button.component.html',
  styleUrls: ['./ubay-button.component.scss']
})
export class UbayButtonComponent implements OnInit {
   _data!: string;
  @Input() 
  get data(): string {
    return this._data;
  }
  set data(value: string) {
    this._data = value;
  }
  constructor() { }

  ngOnInit(): void {
    console.log(this._data)
  }

}
