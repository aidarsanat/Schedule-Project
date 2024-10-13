import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  constructor(private http: HttpClient) {}


  data: any = {
    "code": 0,
    "message": "OK",
    "data": {
      "1014.AUDIT": [
        "mdm.wares_unit_dimension",
        "mdm.wares_unit_dimension3",
        "mdm.wares_unit_dimension2"
      ],
      "1014.KASSA": [
        "mdm.wares_unit_dimension2",
        "mdm.wares_unit_dimension",
        "mdm.wares_unit_dimension3"
      ],
      "1014.MDM": [
        "mdm.wares_unit_dimension"
      ],
      "1014.SPRUT": [
        "mdm.wares_unit_dimension3",
        "mdm.wares_unit_dimension",
        "mdm.wares_unit_dimension2"
      ]
    }
  };

  getAudit() {
    return this.http.get('/api/ext-audit')
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import {AuditReport} from "../interfaces";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuditService {
//
//   constructor(private http: HttpClient) {}
//
//   getAuditReports(): Observable<AuditReport[]> {
//     return this.http.get<AuditReport[]>("/api/ext-audit");
//   }
//
//   createAuditReport(report: AuditReport): Observable<AuditReport> {
//     return this.http.post<AuditReport>("/api/ext-audit", report);
//   }
// }
