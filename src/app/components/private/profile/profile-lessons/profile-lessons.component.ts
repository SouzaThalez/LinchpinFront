import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../../../models/user';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UserLogedService } from '../../../../service/user-loged.service';
import moment from 'moment';
import { PreviewLessonReportDialogComponent } from '../../../shared/preview-lesson-report-dialog/preview-lesson-report-dialog.component';

@Component({
  selector: 'app-profile-lessons',
  templateUrl: './profile-lessons.component.html',
  styleUrl: './profile-lessons.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ProfileLessonsComponent implements OnInit{

  lessonData: any;
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
 
        if(this.currentUser.task == 'habilidade'){
          this.getLessonReports(this.currentUser);
        }else if(this.currentUser.task == 'simulação'){
          this.getScenarioReports(this.currentUser);
         
        }else{

        }
        

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

  private getLessonReports(user: User){

    this.httpClient.get('http://localhost:3000/LessonReports/')
    .subscribe({
        next: (sample: any)=>{
          this.lessonData = sample;
          //client-side filter on reports ny user.
          //Both conditions on filter must be true: user.name and user.role
          this.lessonData = sample.filter((report: any) => {
            return report.user?.name === user.name && report.user?.role === user.role;
          });

          
        },
        error: (erro)=>{console.log('request to lessonReport NOT good: ',erro);}
    })
  }

  private getScenarioReports(user: User){

    this.httpClient.get('http://localhost:3000/ScenarioReports/')
    .subscribe({
        next: (sample: any)=>{

          this.lessonData = sample;
          
          //client-side filter on reports ny user.
          //Both conditions on filter must be true: user.name and user.role
          this.lessonData = sample.filter((report: any) => {
            return report.user?.name === user.name && report.user?.role === user.role;
          });

          console.log(this.lessonData)

          
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
