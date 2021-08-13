import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { House } from '../../main.component';

export interface DialogData {
  house: House;
}

@Component({
  selector: 'app-add-points-dialog',
  templateUrl: './add-points-dialog.component.html',
  styleUrls: ['./add-points-dialog.component.css']
})
export class AddPointsDialogComponent {
  readonly pointsRubricUrl = "https://docs.google.com/spreadsheets/d/1_BdWMlyx3JnN3fTEHw3xMeLkIAkM7-04/edit?usp=sharing&ouid=112595188143955831640&rtpof=true&sd=true";

  form: FormGroup;
  house: House;

  constructor(
    public dialogRef: MatDialogRef<AddPointsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.house = data.house;

    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      studentName: new FormControl('', Validators.required),
      studentGrade: new FormControl('', Validators.required),
      note: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      house: new FormControl({ value: this.house.name, disabled: true }, Validators.required),
      teacherName: new FormControl('', Validators.required)
    });
  }

}
