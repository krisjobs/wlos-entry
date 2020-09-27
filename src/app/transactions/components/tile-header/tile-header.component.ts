import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tile-header',
  templateUrl: './tile-header.component.html',
  styleUrls: ['./tile-header.component.scss'],
})
export class TileHeaderComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;
  @Input() tooltip: string = null;

  public transactionIdCopied: string = null;

  public get trimmedTooltip(): string {
    if (!this.tooltip) {
      return '';
    }

    return this.tooltip.length > 8 ? `${this.tooltip.substr(0, 8)}...` : this.tooltip;
  }

  constructor() { }

  ngOnInit(): void {
  }

  test() {
    this.transactionIdCopied = 'Copied!';
    setTimeout(() => {
      this.transactionIdCopied = null;
    }, 1000);
  }

}
