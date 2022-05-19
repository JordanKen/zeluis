import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {Garage} from '../../../models/Garage';

import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {SortDirection} from "../../admin/garages/merchant-sortable.directive";
import {Review} from "../../../models/review";

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
function sort(tables: Garage[], column: string, direction: string): Garage[] {
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
function matches(tables: Garage, term: string, pipe: PipeTransform) {
  return tables.id.toString().toLowerCase().includes(term)
    || tables.name.toString().toLowerCase().includes(term)
    || tables.name.toString().toLowerCase().includes(term)
    || tables.description.toString().toLowerCase().includes(term)
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line: variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  public _tables$: Garage[];
  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);


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

  getAll(): Observable<any[]> {
    return this.http.get<any>(API_USERS_URL + 'garage');
  }

  save(garage: Garage) {
    this.http.post<any>(API_USERS_URL + 'garage', {
      name: garage.name,
      avatar: garage.avatar,
      openHour: garage.openHour,
      lockHour: garage.lockHour,
      description: garage.description
    });
  }

  saveOrder(garage: Garage) {
    this.http.post<any>(API_USERS_URL + 'garage', {
      name: garage.name,
      avatar: garage.avatar,
      openHour: garage.openHour,
      lockHour: garage.lockHour,
      description: garage.description
    });
  }

  savePreview(review: Review): Observable<any[]> {
    return this.http.post<any>(API_USERS_URL + 'review', {
      name: review.userId,
      titre: review.titre,
      description: review.description,
      note: review.note,
      vehiculeId: review.vehiculeId
    });
  }

}
