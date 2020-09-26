import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile-header',
  templateUrl: './tile-header.component.html',
  styleUrls: ['./tile-header.component.scss']
})
export class TileHeaderComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
