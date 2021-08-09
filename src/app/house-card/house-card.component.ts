import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css']
})
export class HouseCardComponent implements OnInit {
  @Input() bgColor!: string;
  @Input() imgAlt!: string;
  @Input() imgSrc!: string;
  @Input() subtitle!: string;
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.title + " initted!");
  }

}
