import { Component, OnInit } from '@angular/core';
import {AuditService} from "../shared/services/audit.service";


@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.css']
})
export class AuditReportComponent implements OnInit {

  selectedSystemName: string | null = null;
  selectedObjectName: string | null = null;
  selectedDataCode: string | null = null;
  systems!: { name: string, value: string }[];
  objects!: any[];
  data_code!: any[];
  date_begin = new Date();
  date_end = new Date();
  system_name: { name: string, value: string }[] = [];

  constructor(private auditService: AuditService) {
  }

  ngOnInit() {
    // this.auditReports = this.auditReportService.getReports()
    this.initAudit();

  }

  initAudit() {
    this.auditService.getAudit().subscribe((data: any) => {
      this.system_name = Object.keys(data.data).map(key => ({
        name: key,
        value: key
      }));
    });
  }

  onSystemNameChange() {
    if (this.selectedSystemName) {
      const systemData = this.auditService.data.data[this.selectedSystemName];
      this.objects = systemData;
    } else {
      this.objects = [];
    }
  }
}



// // src/app/audit-report/audit-report.component.ts
// import { Component, OnInit } from '@angular/core';
// import {AuditReport} from "../shared/interfaces";
// import {AuditService} from "../shared/services/audit.service";
//
//
// @Component({
//   selector: 'app-audit-report',
//   templateUrl: './audit-report.component.html',
//   styleUrls: ['./audit-report.component.css']
// })
// export class AuditReportComponent implements OnInit {
//   auditReport: AuditReport = {
//     system_name: '',
//     object_name: '',
//     data_code: '',
//     date_begin: new Date(),
//     date_end: new Date(),
//     user: '',
//     status: false
//   };
//
//   auditReports: AuditReport[] = [];
//
//   systemNames = [
//     { label: 'System 1', value: 'system1' },
//     { label: 'System 2', value: 'system2' }
//   ];
//
//   objectNames = [
//     { label: 'Object 1', value: 'object1' },
//     { label: 'Object 2', value: 'object2' }
//   ];
//
//   dataCodes = [
//     { label: 'Data Code 1', value: 'datacode1' },
//     { label: 'Data Code 2', value: 'datacode2' }
//   ];
//
//   constructor(private auditService: AuditService) {}
//
//   ngOnInit(): void {
//     this.loadAuditReports();
//   }
//
//   onSubmit(): void {
//     this.auditService.createAuditReport(this.auditReport).subscribe(result => {
//       console.log('Audit Report Created:', result);
//       this.loadAuditReports();
//     });
//   }
//
//   onReset(): void {
//     this.auditReport = {
//       system_name: '',
//       object_name: '',
//       data_code: '',
//       date_begin: new Date(),
//       date_end: new Date(),
//       user: '',
//       status: false
//     };
//   }
//
//   loadAuditReports(): void {
//     this.auditService.getAuditReports().subscribe(reports => {
//       this.auditReports = reports;
//     });
//   }
//
//   clearField(){
//     this.onReset();
//   }
//
//   downloadReport(report: AuditReport): void {
//     // Логика для скачивания отчета
//     console.log('Скачивание отчета:', report);
//   }
// }



// import {Component, OnInit} from '@angular/core';
// import {AuditService} from "../shared/services/audit.service";
// import {AuditReport} from "../shared/interfaces";
//
// @Component({
//   selector: 'app-audit-report',
//   templateUrl: './audit-report.component.html',
//   styleUrl: './audit-report.component.css'
// })
// export class AuditReportComponent implements OnInit {
//   auditReport: AuditReport = {
//     launch_date: new Date(),
//     user: 'Иванов Иван',
//     system_name: '<system_name>',
//     object_name: '<object_name>',
//     data_code: '789456',
//     date_begin: new Date(),
//     date_end: new Date(),
//     status: true,
//     downloadUrl: '#'
//   }
//
//   reports: any[] = [];
//
//   constructor(private auditService: AuditService) {
//   }
//
//   ngOnInit(): void {
//   }
//
//   onSubmit(): void {
//     this.auditService.createAuditReport(this.auditReport).subscribe(result => {
//       console.log('Audit Report Created:', result);
//     });
//   }
//
//   onReset(): void {
//     this.auditReport = {
//       launch_date: new Date(),
//       user: '',
//       system_name: '',
//       object_name: '',
//       data_code: '',
//       date_begin: new Date(),
//       date_end: new Date(),
//       status: true,
//       downloadUrl: ''
//     };
//   }
// }
