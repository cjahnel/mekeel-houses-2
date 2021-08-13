import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { House, PointEntry } from '../main.component';
import { AddPointsDialogComponent } from './add-points-dialog/add-points-dialog.component';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css']
})
export class HouseCardComponent implements OnInit, OnChanges {
  @Input() house: House;
  @Input() housesCollection: AngularFirestoreCollection<House>;
  @Input() pointEntriesCollection: AngularFirestoreCollection<PointEntry>;

  bgColor: string;
  houseDoc: AngularFirestoreDocument<House>;
  imgAlt: string;
  imgSrc: string;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.houseDoc = this.housesCollection.doc(this.house.id);
  }

  ngOnChanges(): void {
    this.setCardStyles();
  }

  setCardStyles(): void {
    switch (this.house.name) {
      case 'David':
        this.bgColor = 'linear-gradient(to bottom right,#2ecc71,#035f03)',
        this.imgAlt = 'crook',
        this.imgSrc = '../../../assets/crook.svg'
        break;
      case 'Deborah':
        this.bgColor = 'linear-gradient(to bottom right,#8e44ad,#531053)',
        this.imgAlt = 'gavel',
        this.imgSrc = '../../../assets/gavel.svg'
        break;
      case 'Esther':
        this.bgColor = 'linear-gradient(to bottom right,#dab319,#ff0)',
        this.imgAlt = 'crown',
        this.imgSrc = '../../../assets/crown.svg'
        break;
      case 'Gideon':
        this.bgColor = 'linear-gradient(to bottom right,#c75548,red)',
        this.imgAlt = 'candle',
        this.imgSrc = '../../../assets/candle.svg'
        break;
    }
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
      first()
    ).subscribe(newEntry => {
      if (!newEntry) {
        return;
      }
      newEntry.date = firebase.firestore.Timestamp.fromDate(newEntry.date);
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
