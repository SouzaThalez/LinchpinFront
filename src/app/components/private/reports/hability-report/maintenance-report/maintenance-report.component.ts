import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviewCleaningReportDialogComponent } from '../../../../shared/preview-cleaning-report-dialog/preview-cleaning-report-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-maintenance-report',
  templateUrl: './maintenance-report.component.html',
  styleUrl: './maintenance-report.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class MaintenanceReportComponent implements OnInit{


  manitenceData: any;
  filteredReports:any;
  form: FormGroup;
  selectedValue = 0;
  @ViewChild('dateInput') dateInput!: ElementRef;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb : FormBuilder
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

  onDateRangeSelected(startDate: Date, endDate: Date): void {

    if (!startDate || !endDate) {
      return; // Exit if dates are not fully selected
    }
  
    // Ensure original data remains untouched
    const originalData = this.manitenceData;
  
    // Format selected start and end dates
    const convertedStartDate = moment(startDate).startOf('day');
    const convertedEndDate = moment(endDate).endOf('day');
  

    // Filter reports within the selected date range
    this.filteredReports = originalData.filter(report => {
      const reportDate = moment(report.date, 'DD-MM-YYYY').startOf('day');
      return reportDate.isBetween(convertedStartDate, convertedEndDate, null, '[]');
    });
  
    
  }

  onSingleDateSelected(selectedDate: Date): void {
    if (!selectedDate) {
      return; // Exit if no date is selected
    }
  
    // Format the selected date
    const formattedDate = moment(selectedDate).startOf('day');
  
  
    // Filter reports matching the selected date
    this.filteredReports = this.manitenceData.filter(report => {
      const reportDate = moment(report.date, 'DD-MM-YYYY').startOf('day');
      return reportDate.isSame(formattedDate, 'day');
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
    // this.getAllLessonReports();
    this.manitenceData = [...this.manitenceData]; 
  }


  openPreviewCleaningDialog(element: any){


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

  private getAllCleaningReports(){

    let params = new HttpParams()
        .set('simulatorCategory', 'baixa')
        .set('hasDescription','true');
    
    this.httpClient.get('http://localhost:3000/CleaningReports/',{params})
    .subscribe({
        next: (sample: any)=>{
          this.manitenceData = sample;
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
