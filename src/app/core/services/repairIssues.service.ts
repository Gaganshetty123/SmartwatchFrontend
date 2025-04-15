import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RepairIssue } from '../models/RepairIssues.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepairIssueService {
  private apiUrl = `${environment.apiUrl}/repairissues`;  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all repair issues
  getRepairIssues(): Observable<RepairIssue[]> {
    return this.http.get<RepairIssue[]>(this.apiUrl);
  }

  // Add a new repair issue
  addRepairIssue(repairIssue: RepairIssue): Observable<RepairIssue> {
    return this.http.post<RepairIssue>(this.apiUrl, repairIssue);
  }

  // Update an existing repair issue
  updateRepairIssue(repairIssue: RepairIssue): Observable<RepairIssue> {
    return this.http.put<RepairIssue>(`${this.apiUrl}/${repairIssue.id}`, repairIssue);
  }

  // Delete a repair issue
  deleteRepairIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
