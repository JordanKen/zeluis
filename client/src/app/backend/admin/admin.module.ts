import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NgApexchartsModule} from 'ng-apexcharts';
import {FlatpickrModule} from 'angularx-flatpickr';
import {UIModule} from '../../shared/ui/ui.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WidgetModule} from '../../shared/widgets/widget.module';
//import {UiModule} from './ui/ui.module';
//import {AppsModule} from './apps/apps.module';
//import {OtherModule} from './other/other.module';
import {OperationsModule} from './operations/operations.module';
import {TranslateModule} from '@ngx-translate/core';
import {PublicationsModule} from './publications/publications.module';
import {ParametragesModule} from './parametrages/parametrages.module';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgApexchartsModule,
    FlatpickrModule.forRoot(),
    UIModule,
    WidgetModule,
    AdminRoutingModule,
    //UiModule,
    //AppsModule,
    //OtherModule,
    TranslateModule,
    OperationsModule,
    PublicationsModule,
    ParametragesModule,
  ]
})
export class AdminModule {
}
