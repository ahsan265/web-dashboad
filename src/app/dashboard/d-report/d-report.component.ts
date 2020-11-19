import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-d-report',
  templateUrl: './d-report.component.html',
  styleUrls: ['./d-report.component.css']
})
export class DReportComponent implements OnInit {
 image='../assets/logo/logoo.png'
  constructor() {
    const doc = new jsPDF();
    doc.setFont('helvetica')
    doc.getStyle('bold')
    doc.text("Trafficity", 10, 10);
    doc.setFontSize(16);
    doc.addImage(this.image, 'PNG', 15, 40, 50, 50)

    //doc.save("a4.pdf");
   }

  ngOnInit() {
  }

}
