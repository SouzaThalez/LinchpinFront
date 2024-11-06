import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviewCleaningReportDialogComponent } from '../../../../shared/preview-cleaning-report-dialog/preview-cleaning-report-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import moment from 'moment';

@Component({
  selector: 'app-cleaning-report',
  templateUrl: './cleaning-report.component.html',
  styleUrl: './cleaning-report.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CleaningReportComponent implements OnInit{

  cleaningData: any;
  form: FormGroup;


  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb : FormBuilder,
  ){}

  ngOnInit(): void {
    this.getAllCleaningReports();

    this.form = this.createForm();
    this.form.valueChanges.subscribe(values => {
      if (values.start && values.end) {
        this.onDateRangeSelected(values.start, values.end);
      }
    });
    
  }



  openPreviewLessonDialog(element: any){


    let dialogRef = this.matDialog.open(PreviewCleaningReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{simulatorData:element}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })


  }

  onDateRangeSelected(startDate: Date, endDate: Date): void {
  
    const convertedStartDate = moment(startDate).format('DD-MM-YYYY');
    const convertedEndDate = moment(endDate).format('DD-MM-YYYY');

    console.log('Selected Start Date:', convertedStartDate);
    console.log('Selected End Date:', convertedEndDate);

    
    // You can implement further logic here (e.g., filtering data based on the selected dates)
  }


  private getAllCleaningReports(){

    let params = new HttpParams()
        .set('simulatorCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/CleaningReports/', { params })
    .subscribe({
        next: (sample: any)=>{
          console.log('All cleaning reports: ',sample);
          this.cleaningData = sample;
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private createForm(): FormGroup{

    const prevForm = this.fb.group({
      start: [null],
      end:[null],
    })

    return prevForm;
  }


}
