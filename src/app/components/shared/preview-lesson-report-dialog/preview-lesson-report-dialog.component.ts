import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-preview-lesson-report-dialog',
  templateUrl: './preview-lesson-report-dialog.component.html',
  styleUrl: './preview-lesson-report-dialog.component.scss'
})
export class PreviewLessonReportDialogComponent implements OnInit{
  
  linchpinLogoImage = 'assets/images/login/login-image.png';

  isCurseReport: boolean = false;
  isLessonReport: boolean = false;
  isSimulatorReport: boolean = false;
  isManitanceReport:boolean = false;


  constructor(
    public dialogRef: MatDialogRef<PreviewLessonReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      reportData: any
    },
  ){}
  
  ngOnInit(): void {
    

    if(this.data.reportData.lessonCategory == 'Treinamento Habilidade'){
      this.isLessonReport = true ;
      return
    }
    if(this.data.reportData.lessonCategory == 'curso'){
      this.isCurseReport = true;
      return
    }
    if(this.data.reportData.manitanceCategory != null){
      this.isManitanceReport = true;
      return
    }
  }

  generatePDF() {

    const data = this.data.reportData;
  
    const doc = new jsPDF();

    if(this.isManitanceReport){
          // Title
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Relatório de Manutenção", 105, 10, { align: "center" });
      
        // Add a separator line
        doc.setLineWidth(0.5);
        doc.line(10, 15, 200, 15);
      
        // Add Simulator Image at the Top Right
        if (data.simulatorImage) {
          const imgWidth = 40; // Width of the image in mm
          const imgHeight = 40; // Height of the image in mm
          const imgX = doc.internal.pageSize.width - imgWidth - 10; // 10mm margin from the right
          const imgY = 17; // Start just below the separator line
      
          doc.addImage(data.simulatorImage, "JPEG", imgX, imgY, imgWidth, imgHeight);
        }
      
        let currentY = 25;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Informações sobre o relatório da manutenção", 10, currentY);

        // Add Report Details
        currentY += 10;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        doc.text("Data:", 10, currentY);
        doc.text(data.date || "N/A", 22, currentY);
      
        currentY += 10;
        doc.text("Simulador:", 10, currentY);
        doc.text(data.simulatorName || "N/A", 31, currentY);
      
        currentY += 10;
        doc.text("Tipo da Manutenção:", 10, currentY);
        doc.text(data.manitanceCategory || "N/A", 50, currentY);
      
        // Add Findings (with wrapping)
        currentY += 10;
        doc.text("Achados durante a manutenção:", 10, currentY);

          // Calculate the dimensions for the findings text
        const wrappedFindings = doc.splitTextToSize(data.manitanceFindings || "N/A", 140);
        const findingsYStart = currentY + 10; // Slight offset for spacing
        const findingsLineHeight = 6; // Line height in points for wrapped text
        const findingsTextHeight = wrappedFindings.length * findingsLineHeight;

        // Set gray background for the findings section
        const backgroundMargin = 5; // Padding around the text
        doc.setFillColor(211, 211, 211); // Light gray
        doc.rect(10 - backgroundMargin, findingsYStart - backgroundMargin, 140 + 2 * backgroundMargin, findingsTextHeight + 2 * backgroundMargin, "F");

        // Add the findings text
        doc.text(wrappedFindings, 10, findingsYStart);

        // Update currentY to the end of the findings section
        currentY = findingsYStart + findingsTextHeight;

       // Add Maintenance Register Section
        currentY += 10; // Space before the section
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Itens do Registro da Manutenção", 10, currentY);

        currentY += 10; // Space before the list

        // Iterate through the manitanceRegister array and add items as a list
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        (data.manitanceRegister || []).forEach((item, index) => {
          // Format each item as "1. [Label]: [✔️/❌]"
          const status = item.value ? "✔️" : "❌"; // Use a checkmark or cross for status
          const listItem = `${index + 1}. ${item.label}: ${status}`;
          doc.text(listItem, 10, currentY);
          currentY += 8; // Move down for the next item
        });
        
    

        // Add Intervention Details
        if (data.hasIntervention && data.intervention) {
          currentY += 10; // Small gap before the next section
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text("Informações da intervenção", 10, currentY);
      
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
      
          currentY += 10;
          doc.text("Data:", 10, currentY);
          doc.text(data.intervention.interventionDate || "N/A", 22, currentY);
      
          currentY += 10;
          doc.text("Status:", 10, currentY);
          doc.text(data.intervention.interventionStatus || "N/A", 25, currentY);
      
          currentY += 10;
          doc.text("Registro:", 10, currentY);
          const wrappedText = doc.splitTextToSize(data.intervention.interventionText || "N/A", 140);
          const wrappedYStart = currentY + 10;
          doc.text(wrappedText, 10, wrappedYStart);
      
          const lineHeight = 6; // Line height in points
          const textHeight = wrappedText.length * lineHeight;
          currentY = wrappedYStart + textHeight; // Adjust currentY for the next section
        }
      
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const footerY = pageHeight - 30; // Footer position 30mm from the bottom

        // Separator above the footer
        doc.setLineWidth(0.5);
        doc.line(10, footerY - 10, 200, footerY - 10);

        // Footer Content
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        doc.text(`Relatório gerado por: ${data.user?.name || "N/A"} (${data.user?.role || "N/A"})`, 10, footerY);
        const interventionUser = data.intervention?.interventionUser;
        if (interventionUser) {
          doc.text(
            `Intervenção realizada por: ${interventionUser.name || "N/A"} (${interventionUser.role || "N/A"})`,
            10,
            footerY + 10
          );
        } else {
          doc.text("Intervenção realizada por: N/A", 10, footerY + 10);
        }

        // Add Linchpin Logo Image to the Footer (bottom-right)
        const logoWidth = 20; // Width of the logo in mm
        const logoHeight = 20; // Height of the logo in mm
        const logoX = pageWidth - logoWidth - 10; // 10mm margin from the right
        const logoY = footerY - 5; // Align vertically with the footer

          doc.addImage(this.linchpinLogoImage, "PNG", logoX, logoY, logoWidth, logoHeight);
          // Save the PDF
          doc.save("Relatório de Manutenção.pdf");

          return
    }
      
     // Title
     doc.setFontSize(16);
     doc.setFont("helvetica", "bold");
     doc.text("Relatório de Aula", 105, 10, { align: "center" });
   
     // Add a separator line
     doc.setLineWidth(0.5);
     doc.line(10, 15, 200, 15);
   
     // Add Simulator Image at the Top Right
     if (data.lessonImage) {
       const imgWidth = 40; // Width of the image in mm
       const imgHeight = 40; // Height of the image in mm
       const imgX = doc.internal.pageSize.width - imgWidth - 10; // 10mm margin from the right
       const imgY = 17; // Start just below the separator line
   
       doc.addImage(data.lessonImage, "JPEG", imgX, imgY, imgWidth, imgHeight);
     }
   
     let currentY = 25;
     doc.setFontSize(14);
     doc.setFont("helvetica", "bold");
     doc.text("Informações sobre o relatório de aula", 10, currentY);
 
     // Add Report Details
     currentY += 10;
     doc.setFontSize(12);
     doc.setFont("helvetica", "normal");
 
     doc.text("Data:", 10, currentY);
     doc.text(data.date || "N/A", 22, currentY);
   
     currentY += 10;
     doc.text("Aula:", 10, currentY);
     doc.text(data.lessonName || "N/A", 21, currentY);
   
     currentY += 10;
     doc.text("Categoria:", 10, currentY);
     doc.text(data.lessonCategory + " - " + data.lessonType || "N/A", 30, currentY);
   
     // Add Findings (with wrapping)
     currentY += 10;
     doc.text("Registro da aula:", 10, currentY);
 
       // Calculate the dimensions for the findings text
     const wrappedFindings = doc.splitTextToSize(data.lessonOcorrance || "N/A", 140);
     const findingsYStart = currentY + 10; // Slight offset for spacing
     const findingsLineHeight = 6; // Line height in points for wrapped text
     const findingsTextHeight = wrappedFindings.length * findingsLineHeight;
 
     // Set gray background for the findings section
     const backgroundMargin = 5; // Padding around the text
     doc.setFillColor(211, 211, 211); // Light gray
     doc.rect(10 - backgroundMargin, findingsYStart - backgroundMargin, 140 + 2 * backgroundMargin, findingsTextHeight + 2 * backgroundMargin, "F");
 
     // Add the findings text
     doc.text(wrappedFindings, 10, findingsYStart);
 
     // Update currentY to the end of the findings section
     currentY = findingsYStart + findingsTextHeight;
     // Add Intervention Details
     if (data.simulatorDescription) {
       currentY += 10; // Small gap before the next section
       doc.setFontSize(14);
       doc.setFont("helvetica", "bold");
       doc.text("Informações do simulador", 10, currentY);
   
       doc.setFontSize(12);
       doc.setFont("helvetica", "normal");
   
       currentY += 10;
       doc.text("Data:", 10, currentY);
       doc.text(data.simulatorReport.date || "N/A", 22, currentY);
   
       currentY += 10;
       doc.text("Nome:", 10, currentY);
       doc.text(data.simulatorReport.name || "N/A", 25, currentY);
   
       currentY += 10;
       doc.text("Registro do simulador:", 10, currentY);
       const wrappedText = doc.splitTextToSize(data.simulatorReport.ocorrance || "N/A", 140);
       const wrappedYStart = currentY + 10;
       doc.text(wrappedText, 10, wrappedYStart);
   
       const lineHeight = 6; // Line height in points
       const textHeight = wrappedText.length * lineHeight;
       currentY = wrappedYStart + textHeight; // Adjust currentY for the next section
     }
   
     const pageHeight = doc.internal.pageSize.height;
     const pageWidth = doc.internal.pageSize.width;
     const footerY = pageHeight - 30; // Footer position 30mm from the bottom
 
     // Separator above the footer
     doc.setLineWidth(0.5);
     doc.line(10, footerY - 10, 200, footerY - 10);
 
     // Footer Content
     doc.setFontSize(10);
     doc.setFont("helvetica", "normal");
 
     doc.text(`Relatório gerado por: ${data.user?.name || "N/A"} (${data.user?.role || "N/A"})`, 10, footerY);
     const interventionUser = data.intervention?.interventionUser;
     if (interventionUser) {
       doc.text(
         `Intervenção realizada por: ${interventionUser.name || "N/A"} (${interventionUser.role || "N/A"})`,
         10,
         footerY + 10
       );
     } else {
       doc.text("Intervenção realizada por: N/A", 10, footerY + 10);
     }
 
     // Add Linchpin Logo Image to the Footer (bottom-right)
     const logoWidth = 20; // Width of the logo in mm
     const logoHeight = 20; // Height of the logo in mm
     const logoX = pageWidth - logoWidth - 10; // 10mm margin from the right
     const logoY = footerY - 5; // Align vertically with the footer
 
     doc.addImage(this.linchpinLogoImage, "PNG", logoX, logoY, logoWidth, logoHeight);
     // Save the PDF
     doc.save("Relatório de Aula.pdf");
   

  }
  

}
