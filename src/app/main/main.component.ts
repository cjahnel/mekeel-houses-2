import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export interface House {
  id: string;
  name: string;
  points: number;
}

export interface HouseCardData {
  bgColor: string;
  house: House;
  imgAlt: string;
  imgSrc: string;
  subtitle: string;
  title: string;
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
export class MainComponent implements OnInit {
  houseCardsData: HouseCardData[] = [];
  houses: Observable<House[]>;
  housesCollection: AngularFirestoreCollection<House>;
  pointEntriesCollection: AngularFirestoreCollection<PointEntry>;

  constructor(
    private firestore: AngularFirestore
  ) {
    this.housesCollection = this.firestore.collection('houses', ref => ref.orderBy('name'));
    this.houses = this.housesCollection.valueChanges({ idField: 'id' });
    this.pointEntriesCollection = this.firestore.collection('point-entries');
    this.generateHouseCardsData();
  }

  ngOnInit(): void {
    this.houses.pipe(take(1)).subscribe(houses => {
      console.table(houses);
    });

    // this.houses.subscribe(houses => {
    //   const housesRanked = houses.sort((a, b) => b.points - a.points);
    //   const newArray = housesRanked.map((house, index) => {
    //     return {
    //       rank: index + 1,
    //       houseName: house.name
    //     }
    //   });
    //   console.table(newArray);
    // });
  }

  generateHouseCardsData(): any {
    this.houses.subscribe(houses => {
      this.houseCardsData = [];
      houses.forEach(house => {
        this.houseCardsData.push({
          house,
          title: house.name,
          ...this.getHouseCardData(house.name)!
        })
      })
    });
  }

  getHouseCardData(houseName: string): { bgColor: string, imgAlt: string, imgSrc: string, subtitle: string } | null {
    switch (houseName) {
      case 'David':
        return {
          bgColor: 'linear-gradient(to bottom right,#2ecc71,#035f03)',
          imgAlt: 'crook',
          imgSrc: '../../../assets/crook.svg',
          subtitle: '1000'
        }
      case 'Deborah':
        return {
          bgColor: 'linear-gradient(to bottom right,#8e44ad,#531053)',
          imgAlt: 'gavel',
          imgSrc: '../../../assets/gavel.svg',
          subtitle: '1000'
        }
      case 'Esther':
        return {
          bgColor: 'linear-gradient(to bottom right,#dab319,#ff0)',
          imgAlt: 'crown',
          imgSrc: '../../../assets/crown.svg',
          subtitle: '1000'
        }
      case 'Gideon':
        return {
          bgColor: 'linear-gradient(to bottom right,#c75548,red)',
          imgAlt: 'candle',
          imgSrc: '../../../assets/candle.svg',
          subtitle: '1000'
        }
      default:
        return null;
    }
  }
}
