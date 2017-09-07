import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    DistributorService,
    DistributorPopupService,
    DistributorComponent,
    DistributorDetailComponent,
    DistributorDialogComponent,
    DistributorPopupComponent,
    DistributorDeletePopupComponent,
    DistributorDeleteDialogComponent,
    distributorRoute,
    distributorPopupRoute,
    DistributorResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...distributorRoute,
    ...distributorPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DistributorComponent,
        DistributorDetailComponent,
        DistributorDialogComponent,
        DistributorDeleteDialogComponent,
        DistributorPopupComponent,
        DistributorDeletePopupComponent,
    ],
    entryComponents: [
        DistributorComponent,
        DistributorDialogComponent,
        DistributorPopupComponent,
        DistributorDeleteDialogComponent,
        DistributorDeletePopupComponent,
    ],
    providers: [
        DistributorService,
        DistributorPopupService,
        DistributorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayDistributorModule {}
