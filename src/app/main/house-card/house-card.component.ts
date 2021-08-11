import { Component, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { House, PointEntry } from '../main.component';
import { AddPointsDialogComponent } from './add-points-dialog/add-points-dialog.component';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css']
})
export class HouseCardComponent {
  @Input() bgColor!: string;
  @Input() house!: House;
  @Input() houses!: Observable<House[]>;
  @Input() housesCollection!: AngularFirestoreCollection<House>;
  @Input() imgAlt!: string;
  @Input() imgSrc!: string;
  @Input() pointEntriesCollection!: AngularFirestoreCollection<PointEntry>
  @Input() subtitle!: string;
  @Input() title!: string;
  total: number;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore
  ) {
    this.total = 0;
  }

  // ngOnInit(): void {
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPointsDialogComponent, {
      height: '500px',
      width: '800px',
      data: {
        custom: 'this is some custom data'
      }
    });

    dialogRef.afterClosed().pipe(
      take(1)
    ).subscribe((result: string) => {

      console.log(`Dialog result: ${result}`);
      console.log(result);
    });
  }
}
