import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { House, PointEntry } from '../main.component';
import { AddPointsDialogComponent } from './add-points-dialog/add-points-dialog.component';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css']
})
export class HouseCardComponent implements OnInit {
  @Input() bgColor: string;
  @Input() house: House;
  @Input() houses: Observable<House[]>;
  @Input() housesCollection: AngularFirestoreCollection<House>;
  @Input() imgAlt: string;
  @Input() imgSrc: string;
  @Input() pointEntriesCollection: AngularFirestoreCollection<PointEntry>
  @Input() subtitle: string;
  @Input() title: string;
  houseDoc: AngularFirestoreDocument<House>;
  rank: string;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.houseDoc = this.firestore.collection('houses').doc(this.house.id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPointsDialogComponent, {
      height: '500px',
      width: '800px',
      data: {
        house: this.house
      }
    });

    dialogRef.afterClosed().pipe(
      take(1)
    ).subscribe(newEntry => {
      if (!newEntry) {
        return;
      }
      newEntry.date = firebase.default.firestore.Timestamp.fromDate(newEntry.date);
      this.pointEntriesCollection.add(newEntry);
      this.houseDoc.update({
        points: this.house.points + newEntry.amount
      });
      console.group('Dialog Result');
      console.log(newEntry);
      console.groupEnd();
    });
  }
}
