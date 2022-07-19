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
//import {FileSaverOptions} from 'file-saver';
import * as FileSaver from "file-saver";
                                                                                                                                                                                         
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
      subject_name: ['', [Validators.required]],
    });

    this.authService.getUserByToken().subscribe(
      data => {
        if(data){
          this.currentUser = data['response'].user;
          console.log(this.currentUser)
          this._fetchData();
          console.log(this.tables$);
        }
      }
    )

  }

  ngOnInit() {
    this.breadCrumbItems = [{label: 'Shreyu', path: '/'}, {label: 'Acceuil', path: '/'}, {
      label: 'Certificats',
      active: true
    }];
  }

  _fetchData() {
    this.service.getAll(this.currentUser.id).subscribe(
      res => {
        this.tableData = res["reponse"].data;
        console.log(this.tableData)
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
    this.service.createCertificate(this.certificateForm.get("subject_name").value, this.currentUser.id).subscribe();
    this.modalService.dismissAll();
  }

  deleteCertification(id) {
    if(confirm("Are you sure to delete this certificate?")) {
      this.service.deleteCertificate(id).subscribe();
    }
  }

  downloadCertification(id) {
    this.service.downloadCertificate(id).subscribe(
      result => {
        console.log(result)
        let blob = new Blob([result.response.data.files['certificate.crt']])
        const url = window.URL.createObjectURL(blob)
        FileSaver.saveAs(blob, "cert")
      }
    ), 
    error => console.log(error);
  }

}
