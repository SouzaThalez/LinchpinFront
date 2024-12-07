import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  usersData:any;
  form: FormGroup;
  selectedValue = 0;

  @ViewChild('dateInput') dateInput!: ElementRef;


  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private fb : FormBuilder,
  ){}

  ngOnInit(): void {
    this.getAllLessonReports();
    this.getAllUsers();

    this.form = this.createForm();

    this.form.valueChanges.subscribe(values => {
      if (values.start && values.end) {
        this.onDateRangeSelected(values.start, values.end);
      }
    });


    

    
  }


  onDateRangeSelected(startDate: Date, endDate: Date): void {

    if (!startDate || !endDate) {
      return; // Exit if dates are not fully selected
    }
  
    // Ensure original data remains untouched
    const originalData = this.lessonData;
  
    // Format selected start and end dates
    const convertedStartDate = moment(startDate).startOf("day");
    const convertedEndDate = moment(endDate).endOf("day");
  
  
    // Filter reports within the selected date range
    this.filteredReports = originalData.filter(report => {
      const reportDate = moment(report.date, "DD-MM-YYYY").startOf("day");
      return reportDate.isBetween(convertedStartDate, convertedEndDate, null, '[]');
    });
  
    
  }


  onSingleDateSelected(selectedDate: Date): void {

    if (!selectedDate) {
      return; // Exit if no date is selected
    }
  
    // Format the selected date
    const formattedDate = moment(selectedDate).startOf("day");
  
    
  
    // Filter reports matching the selected date
    this.filteredReports = this.lessonData.filter(report => {
      const reportDate = moment(report.date, "DD-MM-YYYY").startOf("day");
      return reportDate.isSame(formattedDate, "day");
    });
  
    
  }


  clearFilterData(): void {
    // Reset the form fields (date range)
    this.form.reset();
    // Reset the filtered data to the original data
    this.filteredReports = null;
    
    if (this.dateInput) {
      this.dateInput.nativeElement.value = '';
    }
  
    // Reload all data
    
    this.lessonData = [...this.lessonData]; 
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

  private getAllUsers(){

    this.httpClient.get('http://localhost:3000/Users/')
    .subscribe({
        next: (sample: any)=>{
        
          this.usersData = sample;
          
        },
        error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
    })
  }



  private createForm(): FormGroup{

    const dateForm = this.fb.group({
      start: [null],
      end:[null],
    })

    return dateForm;
  }

}
