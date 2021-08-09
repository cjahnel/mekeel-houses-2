import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPointsDialogComponent } from './add-points-dialog/add-points-dialog.component';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddPointsDialogComponent, {
      data: {
        height: '400px',
        width: '600px'
      }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
