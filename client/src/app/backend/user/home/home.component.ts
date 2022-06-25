import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Garage} from "../../../models/garage";
import {environment} from "../../../../environments/environment";
import { GarageService } from '../../admin/garages/garage.service';
import { MerchantSortableDirective } from '../../admin/garages/merchant-sortable.directive';
import { HomeService } from './home.service';
import { Certificate } from 'src/app/models/certificate';
import { AuthService } from 'src/app/core/auth';

@Component({
  selector: 'app-merchants',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService, DecimalPipe]
})
export class HomeComponent implements OnInit {
  breadCrumbItems: any;
  closeResult = '';
  newGarage : Garage;
  certificateForm: FormGroup;
  tableData: Garage[];
  tables$: Observable<Certificate[]>;
  total$: Observable<number>;
  image: File;
  api = environment.apiLocal;

  @ViewChildren(MerchantSortableDirective) headers: QueryList<MerchantSortableDirective>;
  currentUser: any;

  constructor(public service: HomeService, private modalService: NgbModal, private formBuilder: FormBuilder, private authService:AuthService) {
    this.certificateForm = this.formBuilder.group({
      h_name: ['', [Validators.required]],
    });

    this.authService.getUserByToken().subscribe(
      data => {
        if(data){
          this.currentUser = data['response'].user;
          console.log(this.currentUser)
          this._fetchData();
        }
      }
    )

  }

  ngOnInit() {
    this.breadCrumbItems = [{label: 'Shreyu', path: '/'}, {label: 'Acceuil', path: '/'}, {
      label: 'Certificats',
      active: true
    }];
    console.log(this.tables$);
  }

  _fetchData() {
    this.service.getAll(this.currentUser.id).subscribe(
      res => {
        this.tableData = res["data"];
        console.log(res)
      }
    );
  }

  handleFileInput(files: FileList) {
    this.image = files.item(0);
  }

  get f() {
    return this.certificateForm .controls;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  save() {
    this.service.createCertificate(this.certificateForm.get("h_name").value);
    this.modalService.dismissAll();
  }

}
