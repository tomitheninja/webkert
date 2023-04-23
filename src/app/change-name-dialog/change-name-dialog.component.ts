import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-name-dialog',
  templateUrl: './change-name-dialog.component.html',
  styleUrls: ['./change-name-dialog.component.css'],
})
export class ChangeNameDialogComponent implements OnInit {
  newNameControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<ChangeNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.newNameControl = new FormControl(this.data.name);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
