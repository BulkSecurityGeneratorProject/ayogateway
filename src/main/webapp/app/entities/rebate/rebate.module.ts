import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    RebateService,
    RebatePopupService,
    RebateComponent,
    RebateDetailComponent,
    RebateDialogComponent,
    RebatePopupComponent,
    RebateDeletePopupComponent,
    RebateDeleteDialogComponent,
    rebateRoute,
    rebatePopupRoute,
    RebateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...rebateRoute,
    ...rebatePopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RebateComponent,
        RebateDetailComponent,
        RebateDialogComponent,
        RebateDeleteDialogComponent,
        RebatePopupComponent,
        RebateDeletePopupComponent,
    ],
    entryComponents: [
        RebateComponent,
        RebateDialogComponent,
        RebatePopupComponent,
        RebateDeleteDialogComponent,
        RebateDeletePopupComponent,
    ],
    providers: [
        RebateService,
        RebatePopupService,
        RebateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayRebateModule {}
