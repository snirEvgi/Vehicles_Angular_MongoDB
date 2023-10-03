import { Component } from '@angular/core';
import { AuditService } from '../services/audit/audit.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent {
  public audits: any[] =[]
  public tableHeaders: any[]=[]
  public filterCriteria: any = {};
constructor(private auditService:AuditService){}
async ngOnInit(): Promise<void> {
  try {
    const result = await this.auditService.getAudit().toPromise();
    this.audits = result as any;
    if (this.audits.length > 0) {
      const headers = Object.keys(this.audits[0]);
      this.tableHeaders = headers;
    }
  } catch (error) {
    console.error('Error fetching vehicles:', error);
  }
}

async getAudit() {
  const result = await this.auditService.getAudit();
  this.audits = result as any;
}
async searchById(): Promise<void> {
  try {
    const result = await this.auditService.getFilteredAudits(this.filterCriteria).toPromise();
    console.log(result);
    
    this.audits = result as any
    console.log(this.audits);
    
    
  } catch (error) {
    console.error('Error fetching filtered vehicles:', error);
  }
}
}
