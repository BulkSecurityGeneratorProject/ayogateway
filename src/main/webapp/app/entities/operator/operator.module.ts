import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    OperatorService,
    OperatorPopupService,
    OperatorComponent,
    OperatorDetailComponent,
    OperatorDialogComponent,
    OperatorPopupComponent,
    OperatorDeletePopupComponent,
    OperatorDeleteDialogComponent,
    operatorRoute,
    operatorPopupRoute,
    OperatorResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...operatorRoute,
    ...operatorPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OperatorComponent,
        OperatorDetailComponent,
        OperatorDialogComponent,
        OperatorDeleteDialogComponent,
        OperatorPopupComponent,
        OperatorDeletePopupComponent,
    ],
    entryComponents: [
        OperatorComponent,
        OperatorDialogComponent,
        OperatorPopupComponent,
        OperatorDeleteDialogComponent,
        OperatorDeletePopupComponent,
    ],
    providers: [
        OperatorService,
        OperatorPopupService,
        OperatorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayOperatorModule {}
