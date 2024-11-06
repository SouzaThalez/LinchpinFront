import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviewLessonReportDialogComponent } from '../../../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-lesson-report',
  templateUrl: './lesson-report.component.html',
  styleUrl: './lesson-report.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class LessonReportComponent implements OnInit{
 
  lessonData: any;
  filteredReports:any;
  form: FormGroup;
  selectedValue = 0 ;


  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb : FormBuilder,
  ){}

  ngOnInit(): void {
    this.getAllLessonReports();

    this.form = this.createForm();
    this.form.valueChanges.subscribe(values => {
      if (values.start && values.end) {
        this.onDateRangeSelected(values.start, values.end);
      }
    });
    
  }

  openPreviewLessonDialog(element: any){


    let dialogRef = this.matDialog.open(PreviewLessonReportDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{reportData:element}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })


  }
  
  onDateRangeSelected(startDate: Date, endDate: Date): void {
    
    this.clearFilterData();
    const originalData = this.lessonData;

    const convertedStartDate = moment(startDate).format('DD-MM-YYYY');
    const convertedEndDate = moment(endDate).format('DD-MM-YYYY');

    console.log('Selected Start Date:', convertedStartDate);
    console.log('Selected End Date:', convertedEndDate);

    this.filteredReports = originalData.filter(report => {
      
      const reportDate = moment(report.date).format('DD-MM-YYYY');
      // Check if the report date is within the selected date range
      return moment(reportDate, 'DD-MM-YYYY').isBetween(convertedStartDate, convertedEndDate, null, '[]');

    });
   
    console.log(this.filteredReports);
    this.lessonData = this.filteredReports;
    


    
  }

  clearFilterData(){
    this.getAllLessonReports();
  }

  private getAllLessonReports(){

    // let params = new HttpParams()
    //     .set('simulatorCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/LessonReports/')
    .subscribe({
        next: (sample: any)=>{
        
          this.lessonData = sample;
        },
        error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
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
