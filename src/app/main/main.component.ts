import { Component, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface House {
  id: string;
  name: string;
  points: number;
  rank: number;
}

export interface PointEntry {
  date: firebase.default.firestore.Timestamp;
  studentName: string;
  note: string;
  amount: number;
  studentGrade: string;
  house: string;
  teacherName: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  houses: House[];
  houses$: Observable<House[]>;
  housesCollection: AngularFirestoreCollection<House>;
  pointEntriesCollection: AngularFirestoreCollection<PointEntry>;

  constructor(private firestore: AngularFirestore) {
    this.housesCollection = this.firestore.collection('houses', ref => ref.orderBy('points', 'desc'));
    this.houses$ = this.housesCollection.valueChanges({ idField: 'id' })
      .pipe(
        map(houses => {
          return houses.map((house, index) => {
            return {
              ...house,
              rank: index + 1
            }
          })
        })
      );
    this.houses$.subscribe(houses => {
      this.houses = houses;
      console.table(this.houses);
    });
    this.pointEntriesCollection = this.firestore.collection('point-entries');
  }

  // getRank(house: House): Observable<number> {
  //   return this.houses$.pipe(
  //     map(houses => houses.indexOf(house) + 1)
  //   );
  // }
}
