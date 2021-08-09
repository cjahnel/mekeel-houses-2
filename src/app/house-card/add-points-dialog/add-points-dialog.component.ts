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

  // closeDialog() {
  //   this.dialogRef.close('Bet sum');
  // }
}
