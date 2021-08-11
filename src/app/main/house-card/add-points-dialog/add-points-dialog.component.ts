import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  custom: string
}

@Component({
  selector: 'app-add-points-dialog',
  templateUrl: './add-points-dialog.component.html',
  styleUrls: ['./add-points-dialog.component.css']
})
export class AddPointsDialogComponent implements OnInit {
  form = new FormGroup({
    date: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    studentName: new FormControl('', Validators.required),
    studentGrade: new FormControl('', Validators.required),
    note: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    house: new FormControl('', Validators.required),
    teacherName: new FormControl('', Validators.required)
  });

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