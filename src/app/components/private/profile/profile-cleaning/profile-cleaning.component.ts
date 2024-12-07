import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { UserLogedService } from '../../../../service/user-loged.service';
import { User } from '../../../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { PreviewCleaningReportDialogComponent } from '../../../shared/preview-cleaning-report-dialog/preview-cleaning-report-dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-profile-cleaning',
  templateUrl: './profile-cleaning.component.html',
  styleUrl: './profile-cleaning.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ProfileCleaningComponent implements OnInit{
  
  cleaningData: any;
  filteredReports: any;
  form: FormGroup;
  selectedValue = 0;
  currentUser: User;

  @ViewChild('dateInput') dateInput!: ElementRef;

  constructor(
    private httpClient: HttpClient,
    private fb : FormBuilder,
    private matDialog: MatDialog,
    private userLogedService : UserLogedService
  ){}

  ngOnInit(): void {

    this.form = this.createFormDate();

    this.form.valueChanges.subscribe(values => {
      if (values.start && values.end) {
        this.onDateRangeSelected(values.start, values.end);
      }
    });

    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
        this.getCleaningReports(this.currentUser);
      }
    });

    
  }


  onDateRangeSelected(startDate: Date, endDate: Date): void {

    if (!startDate || !endDate) {
      return; // Exit if dates are not fully selected
    }
  
    // Ensure original data remains untouched
    const originalData = this.cleaningData;
  
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

  private getCleaningReports(user: User){

    this.httpClient.get('http://localhost:3000/CleaningReports/')
    .subscribe({
        next: (sample: any)=>{
          this.cleaningData = sample;
          //client-side filter on reports ny user.
          //Both conditions on filter must be true: user.name and user.role
          this.cleaningData = sample.filter((report: any) => {
            return report.user?.name === user.name && report.user?.role === user.role;
          });

          
        },
        error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
    })
  }

  private createFormDate(): FormGroup{

    const dateForm = this.fb.group({
      start: [null],
      end:[null],
    })

    return dateForm;
  }

}
