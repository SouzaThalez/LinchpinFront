import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  filteredReports:any;
  form: FormGroup;
  selectedValue = 0;
  @ViewChild('dateInput') dateInput!: ElementRef;


  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
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




  onDateRangeSelected(startDate: Date, endDate: Date): void {

    if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
      console.error("Invalid date range.");
      return;
    }
    const originalData = this.cleaningData;

    const convertedStartDate = moment(startDate).startOf("day");
    const convertedEndDate = moment(endDate).endOf("day");
  
    this.filteredReports = originalData.filter(report => {
      const reportDate = moment(report.date, "DD-MM-YYYY", true); // Strict parsing
      if (!reportDate.isValid()) {
        console.error(`Invalid date format: ${report.date}`);
        return false;
      }
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
    this.filteredReports = this.cleaningData.filter(report => {
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
    // this.getAllLessonReports();
    this.cleaningData = [...this.cleaningData]; 
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

  private getAllCleaningReports(){

    let params = new HttpParams()
        .set('simulatorCategory', 'baixa');
    
    this.httpClient.get('http://localhost:3000/CleaningReports/', { params })
    .subscribe({
        next: (sample: any)=>{
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
