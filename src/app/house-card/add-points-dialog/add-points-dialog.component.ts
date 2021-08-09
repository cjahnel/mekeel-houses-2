import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  height: string,
  width: string
}

@Component({
  selector: 'app-add-points-dialog',
  templateUrl: './add-points-dialog.component.html',
  styleUrls: ['./add-points-dialog.component.css']
})
export class AddPointsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPointsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  // create Form or Reactive Form and hook up Form Group and Form Control
  // use error state matcher found here: [https://material.angular.io/components/select/overview] and inject into select elements

  // closeDialog() {
  //   this.dialogRef.close('Bet sum');
  // }
}
