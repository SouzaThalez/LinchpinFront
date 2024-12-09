import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-preview-cleaning-report-dialog',
  templateUrl: './preview-cleaning-report-dialog.component.html',
  styleUrl: './preview-cleaning-report-dialog.component.scss'
})
export class PreviewCleaningReportDialogComponent implements OnInit{

  linchpinLogoImage = 'assets/images/login/login-image.png';


  constructor(
    public dialogRef: MatDialogRef<PreviewCleaningReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulatorData: any
    },
  ){}
  
  ngOnInit(): void {
    

  }

  generatePDF() {

    const data = this.data.simulatorData;
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Relatório de Limpeza", 105, 10, { align: "center" });
  
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
  
    // Add Report Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
  
    let currentY = 25;
    doc.text("Data:", 10, currentY);
    doc.text(data.date || "N/A", 22, currentY);
  
    currentY += 10;
    doc.text("Simulator:", 10, currentY);
    doc.text(data.simulatorName || "N/A", 30, currentY);
  
    currentY += 10;
    doc.text("Código:", 10, currentY);
    doc.text(data.simulatorCode || "N/A", 27, currentY);
  
    currentY += 10;
    doc.text("Categoria do simulador:", 10, currentY);
    doc.text(data.simulatorCategory || "N/A", 57, currentY);
  
    currentY += 10;
    doc.text("Categoria da limpeza:", 10, currentY);
    doc.text(data.cleaningCategory || "N/A", 55, currentY);
  
    // Add Findings (with wrapping)
    currentY += 10;
    doc.text("Achados:", 10, currentY);

      // Calculate the dimensions for the findings text
    const wrappedFindings = doc.splitTextToSize(data.findings || "N/A", 140);
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
    doc.save("Relatório de Limpeza.pdf");

  }
  

}
