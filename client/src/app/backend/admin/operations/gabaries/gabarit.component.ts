import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MerchantSortableDirective} from "../../garages/merchant-sortable.directive";
import {GabaritService} from "./gabarit.service";
import {Gabarit} from "../../../../models/gabaries";
import {environment} from "../../../../../environments/environment";
import { HomeService } from 'src/app/backend/user/home/home.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './Gabarit.component.html',
  styleUrls: ['./Gabarit.component.scss'],
  providers: [HomeService, DecimalPipe]
})
export class GabaritComponent implements OnInit {
  breadCrumbItems: any;
  closeResult = '';
  newGabarit : Gabarit;
  gabaritForm: FormGroup;
  tableData: Gabarit[];
  tables$: Observable<Gabarit[]>;
  total$: Observable<number>;
  image: File;
  api = environment.apiLocal;


  @ViewChildren(MerchantSortableDirective) headers: QueryList<MerchantSortableDirective>;

  constructor(public service: HomeService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.gabaritForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.breadCrumbItems = [{label: 'BlueCert', path: '/'}, {label: 'Paramètrages', path: '/'}, {
      label: 'Certificats',
      active: true
    }];

    this._fetchData();
  }

  _fetchData() {
    this.service.getAlls().subscribe(
      res => {
        console.log(res)
        this.tableData = res["reponse"].data;
      }
    );
  }

  get f() {
    return this.gabaritForm.controls;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  prepare() {
    this.newGabarit = new Gabarit();
    this.newGabarit.name = this.gabaritForm.get('name').value;
    this.newGabarit.avatar = this.image;
  }


  handleFileInput(files: FileList) {
    this.image = files.item(0);
  }

}
