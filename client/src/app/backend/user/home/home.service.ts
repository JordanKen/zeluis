import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { SortDirection } from '@angular/material/sort';
import { AuthService, User } from 'src/app/core/auth';
import { Certificate } from 'src/app/models/certificate';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}
function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}
const API_USERS_URL = environment.API;
/**
 * Sort the table data

 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(tables: Certificate[], column: string, direction: string): Certificate[] {
  if (direction === '') {
    return tables;
  } else {
    return [...tables].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

/**
 * Table Data Match with Search input
 * @param tables Table field value fetch
 * @param term Search the value
 */
function matches(tables: Certificate, term: string, pipe: PipeTransform) {
  return tables.id.toString().toLowerCase().includes(term)
}
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line: variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  public _tables$: Certificate[];
  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);
  private currentUser: User


  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 1,
    endIndex: 10,
    totalRecords: 0
  };
  private pipe: PipeTransform;
  constructor(private http: HttpClient) {
  }

  getAll(id): Observable<any[]> {
      return this.http.get<any>(API_USERS_URL + 'certification', { params: { 'user_id': id } });
  }
  createCertificate(h_name, id): Observable<any[]> {
    let fd = new FormData();
    fd.append('subject_name', h_name)
    fd.append('user_id', id)
    let obj = {
      subject_name: h_name,
      user_id: id
    }
    return this.http.post<any>(API_USERS_URL + 'certification', obj);
  }

}
