import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-out-dialog',
  templateUrl: './log-out-dialog.component.html',
  styleUrl: './log-out-dialog.component.scss'
})
export class LogOutDialogComponent {

  yes = 'yes';
  no = 'no';

  constructor(
    public dialogRef: MatDialogRef<LogOutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    
  }

  onClose(value:string): void {
    this.dialogRef.close(value);
  }


}
